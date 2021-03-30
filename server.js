const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
//import the Sales class from DataStore.js
const DataStore = require("./DataStore.js");
const app = express();
const staticDir = path.resolve("./client/public");
//connect to the database and sales data
const salesDB = new DataStore(
  `mongodb+srv://admagic:admagic12345@cluster0.9xf59.mongodb.net/adMagic?retryWrites=true&w=majority`,
  "adMagic",
  "Sales"
);

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

//show all sales objects
app.get("/all-sales", async (request, response) => {
  let allSalesObjects = await salesDB.showAll();
  response.json(allSalesObjects);
});

app.get("/countries", async (request, response) => {
  let allSalesObjects = await salesDB.showAll();
  let countryArray = [] 
  for (object of allSalesObjects) {
    // console.log(object)
    if (object.Country__c && !countryArray.includes(object.Country__c)) {
      countryArray.push(object.Country__c)
    }
  } 
  countryArray = countryArray.sort()
  response.json(countryArray)
  })

  let clientsArray = [] 
  app.get("/clients", async (request, response) => {
    let allSalesObjects = await salesDB.showAll();
    for (object of allSalesObjects) {
      // console.log(object)
      if (object.Account__c && !clientsArray.includes(object.Account__c)) {
        clientsArray.push(object.Account__c)
      }
    } 
    clientsArray = clientsArray.sort()
    response.json(clientsArray)
    })

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
