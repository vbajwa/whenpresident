var express = require("express");
var hbs     = require("express-handlebars");
var db      = require("./db/connection");

var app     = express();

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  res.render("candidates-index", {
    candidates: db.candidates
  });
});

app.get("/candidates/:name", function(req, res){
  var data = {
    name: req.params.name,
    year: 2024
  }
  res.render("candidates-show", {
    candidate: data
  });
});

app.listen(3001, function(){
  console.log("It's aliiive!");
});
