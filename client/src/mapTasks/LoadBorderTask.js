import React from "react";
import { features } from "../borderData/countries.json";
import { useEffect } from "react";
// import LoadTotalSalesTask from "./LoadTotalSalesTask";
// import totalSalesList from "./LoadTotalSalesTask";

class LoadBorderTask {
  totalSales = [];
  setState = null;
  mapCountries = features;

  //load method that will accept a state change function
  load = (setState) => {
    fetch("/total-sales")
      .then((res) => res.json())
      .then((list) => {
        console.log("Inside of fetch about to get sales list");
        list.forEach((countrySale) => {
          this.totalSales.push(countrySale);
        });
        console.log(this.totalSales);
      });

    this.setState = setState;
    // setState(features); //works but do not want to call it right away
    //then that state change function will take the destructured features import from the geojson
  };

  loopTotalSales() {
    for (let i = 0; i < this.mapCountries.length; i++) {
      console.log(this.totalSales);
      const mapCountry = this.mapCountries[i];
      let matchedSalesValue;
      for (let j = 0; j < this.totalSales.length; j++) {
        console.log("Inside inner loop");
        console.log(this.totalSales[j]._id);
        if (mapCountry.properties.ADMIN === this.totalSales[j]._id) {
          return (matchedSalesValue = this.totalSales[j]);
        }
      }

      // console.log("outside inner loop matched sales value is");
      // console.log(matchedSalesValue);
      // const matchedSalesValue = this.totalSales.find(
      //   (matchedSalesValue) =>
      //     matchedSalesValue._id === mapCountry.properties.ADMIN
      // );

      // console.log("this. total sales");
      // console.log(this.totalSales);
      // console.log("map country");
      // console.log(mapCountry);
      // console.log("matched sales value");
      // console.log(matchedSalesValue);

      //DEFAULT VALUES:
      //geoJSON layer properties total sales
      mapCountry.properties.totalSales = 0;
      //modal text
      mapCountry.properties.totalSalesText = "0";

      if (matchedSalesValue != null) {
        console.log(
          "Inside of conditional about to assign sales value to geoJSON"
        );
        const assignTotalSales = matchedSalesValue.totalSales;

        console.log(assignTotalSales);
        mapCountry.properties.totalSales = assignTotalSales;
        // console.log("NOW the geoJSON sales is ");
        // console.log(mapCountry.properties.officialSales);

        mapCountry.properties.totalSalesText = assignTotalSales;
        // console.log("Map Modal text should display: ");
        // console.log(mapCountry.properties.totalSalesText);
      }
    }
    // assign finally the geoJSON layer to setCountryBorder that was originally passed when useEffect called the load function
    this.setState(this.mapCountries);
  }
}

export default LoadBorderTask;
