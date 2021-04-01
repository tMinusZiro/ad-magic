import React from "react";
import { features } from "../borderData/countries.json";
import { useEffect } from "react";
// import LoadTotalSalesTask from "./LoadTotalSalesTask";
// import totalSalesList from "./LoadTotalSalesTask";

class LoadBorderTask {
  // totalSales = [];
  setState = null;
  mapCountries = features;

  //load method that will accept a state change function
  load(setCountries) {
    this.setCountries = setCountries;
    // fetch("/total-sales")
    //   .then((res) => res.json())
    //   .then((list) => {
    //     // list.forEach((countrySale) => {
    //     //   this.totalSales.push(countrySale);
    //     // });
    //     setTotalSales(list);
    //     console.log("Inside of fetch logging out total sales");
    //     // console.log(this.totalSales);
    //   });
  }

  // setState(features); //works but do not want to call it right away
  //then that state change function will take the destructured features import from the geojson
  assignTotalSales(totalSales) {
    console.log("total sales looks like this in second method : ");
    console.log(totalSales);
    this.totalSales = totalSales;

    // console.log("entered loop total sales method");
    for (let i = 0; i < this.mapCountries.length; i++) {
      const mapCountry = this.mapCountries[i];
      // const totalSales = this.totalSales;

      // console.log(totalSales);
      // let matchedSalesValue;
      // for (let j = 0; j < this.totalSales.length; j++) {
      //   console.log("Inside inner loop");
      //   console.log(this.totalSales[j]._id);
      //   if (mapCountry.properties.ADMIN === this.totalSales[j]._id) {
      //     matchedSalesValue = this.totalSales[j];
      //   }
      // }
      // console.log(matchedSalesValue);

      // console.log("above find method");
      // console.log(totalSales);
      // console.log(mapCountry.properties.ADMIN);

      // const matchedSalesValue = this.totalSales.find(
      //   (item) => item._id === mapCountry.properties.ADMIN
      // );
      // console.log("current matched value");
      // console.log(matchedSalesValue);
      // console.log("just left the find method and about to assign default");
      // console.log(matchedSalesValue);

      //DEFAULT VALUES:
      //geoJSON layer properties total sales
      mapCountry.properties.totalSales = 0;
      //modal text
      mapCountry.properties.totalSalesText = "0";

      // let matchedSalesValue;
      // if (matchedSalesValue != null) {
      //   console.log(
      //     "Inside of conditional about to assign sales value to geoJSON"
      //   );
      //   const assignTotalSales = matchedSalesValue.totalSales;

      //   console.log(assignTotalSales);
      //   mapCountry.properties.totalSales = assignTotalSales;
      //   // console.log("NOW the geoJSON sales is ");
      //   // console.log(mapCountry.properties.officialSales);

      //   mapCountry.properties.totalSalesText = assignTotalSales;
      //   // console.log("Map Modal text should display: ");
      //   // console.log(mapCountry.properties.totalSalesText);
      // }
    }

    // assign finally the geoJSON layer to setCountryBorder that was originally passed when useEffect called the load function
    this.setCountries(this.mapCountries);
  }
}

export default LoadBorderTask;
