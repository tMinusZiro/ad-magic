const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;

const staticDir = path.resolve("./client/public");

const { MongoClient} = require("mongodb")
const uri = `mongodb+srv://admagic:admagic12345@cluster0.9xf59.mongodb.net/adMagic?retryWrites=true&w=majority`
const client = new MongoClient(uri, {useUnifiedTopology: true})

async function runQuery() {
  await client.connect()
  const database = client.db("adMagic")
  const collection = database.collection("Sales")
  const results = await collection.find({})
  await results.forEach(doc => console.log(doc))
  await client.close()
}
runQuery() 



//global import of mongoose schema
// const MagicModel = require("./mongoose.js");

// //-------SERVER SETUP----------//
const app = express();

// //middleware for helping read body of post request
// app.use(express.urlencoded({ extended: true }));

// app.get("*", async (req, res) => {
//   const cursor = await MagicModel.find({});
//   console.log("Curser =", cursor);

//   let results = [];
//   //iterate through each document in collection and push it into array
//   await cursor.forEach((entry) => {
//     results.push(entry);
//   });

//   res.json(results);
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
