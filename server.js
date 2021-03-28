const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;

const staticDir = path.resolve("./client/public");

//-------SERVER SETUP----------//
const app = express();

//middleware for helping read body of post request
app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
