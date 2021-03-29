const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;

// const mongoose = require("mongoose");

const staticDir = path.resolve("./client/public");

//global import of mongoose schema
// Create a new MongoClient
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admagic:admagic12345@cluster0.9xf59.mongodb.net/adMagic?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//-------SERVER SETUP----------//
const app = express();

//middleware for helping read body of post request
app.use(express.urlencoded({ extended: true }));

//setup for testing mongoose connection
// app.get("*", async (req, res) => {
//   const cursor = await MagicModel.findOne({ Account__c: "Main Line Games" });
//   console.log("Curser =", cursor);
//   res.json(results);
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
