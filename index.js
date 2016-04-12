var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var mongoose= require("./db/connection");
var twitter = require("./lib/twitter_auth");

var app     = express();

var Candidate = mongoose.model("Candidate");

if(process.env.NODE_ENV !== "production"){
  var env   = require("./env");
  process.env.session_secret = env.session_secret;
  process.env.t_callback_url = env.t_callback_url;
  process.env.t_consumer_key = env.t_consumer_key;
  process.env.t_consumer_secret = env.t_consumer_secret;
}

app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new (require("connect-mongo")(session))({
    mongooseConnection: mongoose.connection
  })
}));

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));
app.use(function(req, res, next){
  twitter.checkIfSignedIn(req, res, function(){
    next();
  });
});

app.get("/login/twitter", function(req, res){
  twitter.getSigninURL(req, res, function(url){
    res.redirect(url);
  });
});

app.get("/login/twitter/callback", function(req, res){
  twitter.whenSignedIn(req, res, function(){
    res.redirect("/");
  });
});

app.get("/logout", function(req, res){
  req.session.destroy();
  res.redirect("/");
});

app.get("/api/candidates", function(req, res){
  Candidate.find({}).then(function(candidates){
    res.json(candidates);
  });
});

app.get("/api/candidates/:name", function(req, res){
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    candidate.isCurrentUser = (candidate._id == req.session.candidate_id);
    res.json(candidate);
  });
});

app.delete("/api/candidates/:name", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then(function(candidate){
    res.json(candidate);
  });
});

app.get("/*", function(req,res){
  res.render("candidates");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
