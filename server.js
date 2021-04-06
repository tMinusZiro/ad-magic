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

//create a list of items based on a client
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

//showSalesArray gets populated when the form is submitted
let showSalesArray = [];
let formRes;
app.post("/show-item-sales", async (request, response) => {
  //if user has already submitted a form, clear the results to re-load new results
  showSalesArray = [];
  formRes = request.body;
  console.log(formRes);
  //findSalesByForm uses $match to match the form results with proper parameters
  let totalSales = await salesDB.findSalesByForm(formRes);
  await totalSales.forEach((item) => {
    showSalesArray.push(item);
  });
  response.redirect("/");
});

let totalSalesArray = [];
app.get("/show-sales/:region", async (request, response) => {
  let region = request.params.region;
  console.log("The Region is : ", region);
  console.log(" /SHOW SALES route");
  console.log("OUTSIDE of conditional");
  console.log(totalSalesArray);
  //if user has not submitted sidebar form, show all sales
  if (showSalesArray.length === 0 && region === "United States") {
    response.send(totalSalesArray);
  } else if (showSalesArray.length === 0) {
    totalSalesArray = [];

    //findAllSales() filters by country (long term - country or US)
    let totalSalesByCountry = await salesDB.findAllSales(region);
    await totalSalesByCountry.forEach((item) => {
      totalSalesArray.push(item);
    });

    // console.log(totalSalesArray);
    response.send(totalSalesArray);
  } else {
    response.send(showSalesArray);
  }
});

app.get("/client/:min/:max", async (request, response) => {
  let min = request.params.min;
  let max = request.params.max;
  let clientsOfCertainSales = [];
  for (let i = 0; i < clientsArray.length; i++) {
    if (
      clientsArray[i].totalSales >= min &&
      clientsArray[i].totalSales <= max
    ) {
      clientsOfCertainSales.push(clientsArray[i]._id);
      clientsOfCertainSales.push(clientsArray[i].totalSales.toFixed(2));
    }
  }
  response.send(clientsOfCertainSales);
});

app.get("/united-states", async (request, response) => {
  totalSalesArray = [];
  console.log(request.body);
  console.log("in the post!");
  let totalSalesByCountry = await salesDB.findAllSales("United States");
  await totalSalesByCountry.forEach((item) => {
    totalSalesArray.push(item);
  });
  console.log("UNITED STATES ARRAY SERVER SIDE");
  console.log(totalSalesArray);
  response.redirect("/united");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
