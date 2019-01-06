const fetch = require("node-fetch");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/barstool");

 var db = mongoose.connection;

 db.on("error", console.error.bind(console, "connection error"));
 db.once("open", function(callback) {
     console.log("Connection succeeded.");
 });

var Schema = mongoose.Schema;

var stoolSchema = new Schema({
     info: Array
   });

var Stool = mongoose.model("Bartsool", stoolSchema);

const barstool = "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json";

const getData = async barstool => {
  try {
    const response = await fetch(barstool);
    const json = await response.json();
    console.log(json);
    var Game = new Stool({
     info: json
 });

 Game.save(function(error) {
     console.log("Your info has been saved!");
 if (error) {
     console.error(error);
  }
 });
  } catch (error) {
    console.log(error);
  }
};

getData(barstool);
