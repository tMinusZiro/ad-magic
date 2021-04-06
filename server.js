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
  let clientSales = await salesDB.findClients();
  let clientSalesArray = [];
  await clientSales.forEach((item) => {
    clientSalesArray.push(item);
  });
  response.send(clientSalesArray);
});

//render a list of items based on a client
app.get("/items/:client", async (request, response) => {
  let client = request.params.client;
  console.log(client);
  let itemSales = await salesDB.findClients();
  let itemArray = [];
  // console.log(itemSales)
  await itemSales.forEach((item) => {
    if (client === "all") {
      itemArray.push(item.itemList);
    } else if (client === item._id) {
      itemArray.push(item.itemList);
    }
  });
  console.log(itemArray);
  response.send(itemArray);
});

//create a list of all dates
// let datesArray = [];
// app.get("/dates", async (request, response) => {
//   let allSalesObjects = await salesDB.showAll();
//   let exampleDate = allSalesObjects[0].Transaction_date__c;
//   // console.log(
//   //   exampleDate,
//   //   typeof exampleDate,
//   //   exampleDate.getMonth(),
//   //   exampleDate.getFullYear()
//   // );
//   for (object of allSalesObjects) {
//     if (
//       object.Transaction_date__c &&
//       !datesArray.includes(object.Transaction_date__c)
//     ) {
//       datesArray.push(object.Transaction_date__c);
//     }
//   }
//   datesArray = datesArray.sort((a, b) => b.date - a.date);
//   response.json(datesArray);
// });

//   console.log(client)
//   let itemSales = await salesDB.findClients();
//   let itemArray = [];
//   // console.log(itemSales)
//   await itemSales.forEach((item) => {
//     if (client === "all") {
//       itemArray.push(item.itemList);
//     } else if (client === item._id) {
//       itemArray.push(item.itemList);
//     }
//   });
//   console.log(itemArray)
//   response.send(itemArray);
// });

let showSalesArray = [];
app.post("/show-item-sales", async (request, response) => {
  let formRes = request.body;
  let totalSales = await salesDB.findSalesByForm(formRes);
  await totalSales.forEach((item) => {
    showSalesArray.push(item);
  });
  response.send(showSalesArray);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
