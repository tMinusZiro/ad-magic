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

// filtering total sales
app.get("/total-sales", async (request, response) => {
  let totalSales = await salesDB.totalSales();
  let countrySalesArray = [];
  await totalSales.forEach((item) => {
    countrySalesArray.push(item);
  });

  response.send(countrySalesArray);
});

app.get("/countries", async (request, response) => {
  let allSalesObjects = await salesDB.showAll();
  let countryArray = [];
  for (object of allSalesObjects) {
    if (object.Country__c && !countryArray.includes(object.Country__c)) {
      countryArray.push(object.Country__c);
    }
  }
  countryArray = countryArray.sort();
  response.json(countryArray);
});

let clientsArray = [];
app.get("/clients", async (request, response) => {
  let allSalesObjects = await salesDB.showAll();
  for (object of allSalesObjects) {
    // console.log(object)
    if (object.Account__c && !clientsArray.includes(object.Account__c)) {
      clientsArray.push(object.Account__c);
    }
  }
  clientsArray = clientsArray.sort();
  response.json(clientsArray);
});
 
//create a list of clients 
let clientsArray = [];
app.get("/clients", async (request, response) => {
  let allSalesObjects = await salesDB.showAll();
  for (object of allSalesObjects) {
    if (object.Account__c && !clientsArray.includes(object.Account__c)) {
      clientsArray.push(object.Account__c);
    }
  }
  clientsArray = clientsArray.sort();
  response.json(clientsArray);
});

//render a list of items based on a client
app.get("/items/:client", async (request, response) => { 
  let allSalesObjects = await salesDB.showAll();
  let client = request.params.client 
  let itemList = []; 
  for (object of allSalesObjects) {
    if (object.Account__c === client && object.Item__c && !itemList.includes(object.Item__c)) {
      itemList.push(object.Item__c)
    }
  }
  response.json(itemList)
})


//create a list of all dates 
let datesArray = [];
app.get("/dates", async (request, response) => {
  let allSalesObjects = await salesDB.showAll();
  let exampleDate = allSalesObjects[0].Transaction_date__c;
  // console.log(
  //   exampleDate,
  //   typeof exampleDate,
  //   exampleDate.getMonth(),
  //   exampleDate.getFullYear()
  // );
  for (object of allSalesObjects) {
    if (
      object.Transaction_date__c &&
      !datesArray.includes(object.Transaction_date__c)
    ) {
      datesArray.push(object.Transaction_date__c);
    }
  }
  datesArray = datesArray.sort((a, b) => b.date - a.date);
  response.json(datesArray);
});




app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
