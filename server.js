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
    // countrySalesArray.push(item);
    countrySalesArray = item;
  });
  response.send(countrySalesArray);
});

//vendors chart data
app.get("/vendors", async (request, response) => {
  let vendorsData = await salesDB.vendors();
  let vendors = [];
  await vendorsData.forEach((entry) => {
    vendors.push(entry);
  });
  response.send(vendors);
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

//create a list of clients
let clientsArray = [];
app.get("/clients", async (request, response) => {
  if (clientsArray.length === 0) {
  let clientSales = await salesDB.findClients();
  await clientSales.forEach((item) => {
    clientsArray.push(item);
  });
}
  response.send(clientsArray);
});

//render a list of items based on a client
app.get("/items/:client", async (request, response) => {
  let client = request.params.client;
  let itemArray = [];
  await clientsArray.forEach((item) => {
    if (client === "all") {
      itemArray.push(item.itemList);
    } else if (client === item._id) {
      itemArray.push(item.itemList);
    }
  });
  response.send(itemArray);
});

let showSalesArray = [];
app.post("/show-item-sales", async (request, response) => {
  let formRes = request.body;
  console.log(formRes);
  let totalSales = await salesDB.findSalesByForm(formRes);
  await totalSales.forEach((item) => {
    showSalesArray.push(item);
  });
});

let totalSalesArray = [];
app.get("/show-sales", async (request, response) => {
  if (showSalesArray.length === 0) {
    let totalSalesByCountry = await salesDB.findAllSales();
    // console.log("totalSales",totalSales)
    await totalSalesByCountry.forEach((item) => {
      totalSalesArray.push(item);
    });
    response.send(totalSalesArray);
  } else return response.send(showSalesArray);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
