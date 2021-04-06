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

//showSalesArray gets populated when the form is submitted
let showSalesArray = [];
let formRes;
app.post("/show-item-sales", async (request, response) => {
  //if user has already submitted a form, clear the results to re-load new results
  showSalesArray = [];
  formRes = request.body;
  console.log("form results", formRes);
  //findSalesByForm uses $match to match the form results with proper parameters
  let totalSales = await salesDB.findSalesByForm(formRes);
  await totalSales.forEach((item) => {
    showSalesArray.push(item);
  });
  response.redirect("/");
});



let USsales = [] 
let totalSalesArray = [];
app.get("/show-sales/:region", async (request, response) => {
  let region = request.params.region;
  console.log(" /SHOW-SALES/:REGION route, outside of conditional", "The Region is : ", region);
  console.log("totalSalesArray", totalSalesArray);
  console.log("USsales", USsales)
  //if user has not submitted sidebar form, show all sales
  if (showSalesArray.length === 0 && region === "United States") {
    console.log("still inside /show-sales/:region, inside if US")
    console.log(USsales)
    // USsales = [];
    // let totalSalesByCountry = await salesDB.findAllSales("United States");
    // await totalSalesByCountry.forEach((item) => {
    //   USsales.push(item);
    // });
    response.send(USsales);
  } else if (showSalesArray.length === 0) {
    console.log("inside else if showsalesarray.length === 0 ")
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

app.get("/show-world-sales", async (request,response) => {



})


app.get("/show-us-sales", async (request,response) => {

  

})


app.post("/united-states", async (request, response) => {
  USsales = [];
  let totalSalesByCountry = await salesDB.findAllSales("United States");
  await totalSalesByCountry.forEach((item) => {
    USsales.push(item);
  });
  console.log("inside the US post request", USsales)
  response.redirect("/united")
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

app.listen(port, () => {
  console.log(`All ears on port${port}`);
});
