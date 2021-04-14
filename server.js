const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
//needed to use local .env variables
require("dotenv").config();
//import the Sales class from DataStore.js
const DataStore = require("./DataStore.js");
const app = express();
const staticDir = process.env.PRODUCTION
  ? path.resolve("./client/build")
  : path.resolve("./client/public");

//connect to the database and sales data
const salesDB = new DataStore(
  `mongodb+srv://admagic:admagic12345@cluster0.9xf59.mongodb.net/adMagic?retryWrites=true&w=majority`,
  "adMagic",
  "Sales"
);
let formRes;
let defaultForm = {
  datePreset: "All time",
};

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

// filtering total sales
app.get("/total-sales", async (request, response) => {
  if (!formRes) {
    let totalSales = await salesDB.totalSales();
    let countrySalesArray = [];
    await totalSales.forEach((item) => {
      // countrySalesArray.push(item);
      countrySalesArray = item;
    });
    response.send(countrySalesArray);
  } else if (formRes) {
    let client = formRes.account;
    let item = formRes.item;
    {
      item ? null : (item = "All Items");
    }
    {
      client ? null : (client = "All Clients");
    }
    let filters;
    let result = await salesDB.filterTotalSales(client, item, formRes);
    await result.forEach((entry) => {
      filters = entry;
    });
    response.send(filters);
  }
});

app.get("/salesTypes", async (request, response) => {
  let client = "All Clients";
  let item = "All Items";
  if (!formRes) {
    let salesTypes = await salesDB.salesTypes(client, item, defaultForm);
    let types = [];
    await salesTypes.forEach((entry) => {
      types.push(entry);
    });
    response.send(types);
  } else if (formRes) {
    client = formRes.account;
    item = formRes.item;
    let salesTypes = await salesDB.salesTypes(client, item, formRes);
    let types = [];
    await salesTypes.forEach((entry) => {
      types.push(entry);
    });
    response.send(types);
  }
});

//fullfilment chart data
app.get("/fullfilment", async (request, response) => {
  let client = "All Clients";
  let item = "All Items";
  // default fetch
  if (!formRes) {
    let fullfilmentType = await salesDB.fullfilmentType(
      client,
      item,
      defaultForm
    );
    let types = [];
    await fullfilmentType.forEach((entry) => {
      types.push(entry);
    });
    response.send(types);
    // fetch after the form is submitted
  } else if (formRes) {
    client = formRes.account;
    item = formRes.item;
    let fullfilmentType = await salesDB.fullfilmentType(client, item, formRes);
    let types = [];
    await fullfilmentType.forEach((entry) => {
      types.push(entry);
    });
    response.send(types);
  }
});

//marketing chart data
app.get("/marketing", async (request, response) => {
  let client = "All Clients";
  let item = "All Items";
  if (!formRes) {
    let optInMarketing = await salesDB.MarketingOpt(client, item, defaultForm);
    let opt = [];
    await optInMarketing.forEach((entry) => {
      opt.push(entry);
    });
    response.send(opt);
  } else if (formRes) {
    client = formRes.account;
    item = formRes.item;
    let optInMarketing = await salesDB.MarketingOpt(client, item, formRes);
    let opt = [];
    await optInMarketing.forEach((entry) => {
      opt.push(entry);
    });
    response.send(opt);
  }
});

//vendors chart data
app.get("/vendors", async (request, response) => {
  let vendorQyt = [];
  let vendorRev = [];
  let vendorTopFive = [];
  let vendorTopRev = [];
  let result = [];
  let client = "All Clients";
  let item = "All Items";
  // default fetch
  if (!formRes) {
    let Vendors = await salesDB.Vendors(client, item, defaultForm);
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
    result.push(vendorTopFive);
    //sort vendor by revenue
    await Vendors.forEach((entry) => {
      vendorRev.push(entry.totalSales);
    });
    vendorRev.sort((a, b) => b - a);
    // to get the top 5
    for (let i = 0; i < 5; i++) {
      await Vendors.forEach((entry) => {
        if (entry.totalSales === vendorRev[i]) {
          vendorTopRev.push(entry);
        }
      });
    }
    result.push(vendorTopRev);
    response.send(result);
    // filter fetch
  } else if (formRes) {
    client = formRes.account;
    item = formRes.item;
    let Vendors = await salesDB.Vendors(client, item, formRes);
    //sort vendor by total sales
    await Vendors.forEach((entry) => {
      vendorQyt.push(entry.numberOfSales);
    });
    vendorQyt.sort((a, b) => b - a);
    // to get the top 5
    for (let i = 0; i < 5; i++) {
      await Vendors.forEach((entry) => {
        if (entry.numberOfSales === vendorQyt[i]) {
          vendorTopFive.push(entry);
        }
      });
    }
    result.push(vendorTopFive);
    //sort vendor by revenue
    await Vendors.forEach((entry) => {
      vendorRev.push(entry.totalSales);
    });
    vendorRev.sort((a, b) => b - a);
    // to get the top 5
    for (let i = 0; i < 5; i++) {
      await Vendors.forEach((entry) => {
        if (entry.totalSales === vendorRev[i]) {
          vendorTopRev.push(entry);
        }
      });
    }
    result.push(vendorTopRev);
    response.send(result);
  }
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
    if (client === "All Clients") {
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

app.post("/show-item-sales", async (request, response) => {
  formRes = request.body;

  showUSSalesArray = [];
  let totalUSSales = await salesDB.findUSSalesByForm(formRes);
  await totalUSSales.forEach((item) => {
    showUSSalesArray.push(item);
  });

  showWorldSalesArray = [];
  let totalSales = await salesDB.findWorldSalesByForm(formRes);
  await totalSales.forEach((item) => {
    showWorldSalesArray.push(item);
  });

  response.redirect("/");
});

//totalSalesArray gets populated when the page loads
let totalSalesArray = [];
app.get("/show-sales", async (request, response) => {
  if (!formRes) {
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

//send the form results back up to the map toggle so they can be displayed after
app.get("/formresults", (request, response) => {
  if (formRes) {
    response.send(formRes);
  } else {
    let defaultForm = {
      datePreset: "All time",
      presetDateName: "Timeframe",
      account: "All Clients",
      presetClientName: "Clients",
      item: "All Items",
      presetItem: "Items",
    };
    response.send(defaultForm);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
