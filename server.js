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

// filtering total sales
app.get("/total-sales/filter", async (request, response) => {
  let client = formRes.account;
  let item = formRes.item;
  console.log("in fetch");
  let filters;
  let result = await salesDB.filterTotalSales(client, item);
  // console.log("crash test", result);
  await result.forEach((entry) => {
    console.log("crash test 1", entry);
    filters = entry;
  });
  console.log(filters);
  response.send(filters);
});

//vendors chart data
app.get("/salesTypes", async (request, response) => {
  let salesTypes = await salesDB.salesTypes();
  let types = [];
  await salesTypes.forEach((entry) => {
    types.push(entry);
  });
  response.send(types);
});

//fullfilment chart data
app.get("/fullfilment", async (request, response) => {
  let fullfilmentType = await salesDB.fullfilmentType();
  let types = [];
  await fullfilmentType.forEach((entry) => {
    types.push(entry);
  });
  response.send(types);
});

//marketing chart data
app.get("/marketing", async (request, response) => {
  let optInMarketing = await salesDB.MarketingOpt();
  let opt = [];
  await optInMarketing.forEach((entry) => {
    opt.push(entry);
  });
  response.send(opt);
});

//vendors chart data
app.get("/vendors", async (request, response) => {
  let Vendors = await salesDB.Vendors();
  let vendorQyt = [];
  let vendorTopFive = [];
  await Vendors.forEach((entry) => {
    vendorQyt.push(entry.numberOfSales);
  });
  //sort vendor by qyt
  vendorQyt.sort((a, b) => b - a);
  // to get the top 5
  for (let i = 0; i < 5; i++) {
    await Vendors.forEach((entry) => {
      if (entry.numberOfSales === vendorQyt[i]) {
        vendorTopFive.push(entry);
      }
    });
  }
  response.send(vendorTopFive);
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
let showWorldSalesArray = [];
let showUSSalesArray = [];
let formRes;
app.post("/show-item-sales", async (request, response) => {
  //if user has already submitted a form, clear the results to re-load new results
  formRes = request.body;
  console.log(formRes);
  if (formRes.US === "on") {
    //empty out an prior results
    showUSSalesArray = [];
    //re-populate teh array using the function in Data Store
    let totalSales = await salesDB.findUSSalesByForm(formRes);
    await totalSales.forEach((item) => {
      showUSSalesArray.push(item);
    });
    //redirect the page so that new map data loads
    response.status(204).send();
  } else {
    //findWordSalesByForm uses $match to match the form results with proper parameters
    showWorldSalesArray = [];
    let totalSales = await salesDB.findWorldSalesByForm(formRes);
    await totalSales.forEach((item) => {
      showWorldSalesArray.push(item);
    });
    response.status(204).send();
  }
});

//totalSalesArray gets populated when the page loads
let totalSalesArray = [];
app.get("/show-sales", async (request, response) => {
  //if user has not submitted sidebar form, show all sales
  if (!formRes) {
    //findAllSales() filters by country (long term - country or US)
    let totalSalesByCountry = await salesDB.findAllWorldSales();
    await totalSalesByCountry.forEach((item) => {
      totalSalesArray.push(item);
    });
    response.send(totalSalesArray);
  } else {
    response.send(showWorldSalesArray);
  }
});

// USsales gets populated when the page is loaded
let USsales = [];
app.get("/show-us", async (request, response) => {
  //if the form has not been submitted, get ALL US sales
  if (showUSSalesArray.length === 0) {
    let totalSalesByState = await salesDB.findAllUSSales();
    await totalSalesByState.forEach((item) => {
      USsales.push(item);
    });
    response.send(USsales);
    //if form has been submitted, send US Data
  } else response.send(showUSSalesArray);
});

//function to get all clients within a specific sales range
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
