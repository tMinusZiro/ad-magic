const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const staticDir = path.resolve("./client/public");

//global import of mongoose schema
const MagicModel = require("./mongoose.js");
//-------SERVER SETUP----------//
const app = express();

//middleware for helping read body of post request
app.use(express.urlencoded({ extended: true }));

app.get("*", async (req, res) => {
  const cursor = await MagicModel.findOne({ Account__c: "Main Line Games" });
  console.log("Curser =", cursor);

  let results = [];
  // //iterate through each document in collection and push it into array
  // await cursor.forEach((entry) => {
  //   results.push(entry);
  // });
  console.log(results);
  res.json(results);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
