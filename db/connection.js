var mongoose  = require("mongoose");

var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }
);

mongoose.model("Candidate", CandidateSchema);

module.exports = mongoose;
