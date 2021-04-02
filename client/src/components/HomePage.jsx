import React from "react";
import { useState, useEffect } from "react";
import NewMap from "./NewMap.jsx";
import MapLegend from "./MapLegend.jsx";
import { features } from "../borderData/countries.json";
import Loading from "./Loading.jsx";
//importing the component task that brings in the geoJSON file
//task will also handle all map data gathering and parsing and then send it to the map
import NewLoadMap from "../mapTasks/NewLoadMap.jsx";
import legendItems from "../entities/LegendItems";

const HomePage = () => {
  //list of countries
  const [countries, setCountries] = useState([]);
  const [totalSales, setTotalSales] = useState();
  const legendItemsInReverse = [...legendItems].reverse();

  //fetch array of objects from db for each  country admagic does business with and total sales for that country
  useEffect(async () => {
    if (!totalSales) {
      await fetch("/total-sales")
        .then((res) => res.json())
        .then((list) => {
          let interArray = [];
          list.forEach((countrySale) => {
            interArray.push(countrySale);
            setTotalSales(interArray);
          });
        });
    }
  });

  console.log("Total Sales");
  console.log(totalSales);

  function setCountryColor(country) {
    const legendItem = legendItems.find((legendItem) =>
      legendItem.isFor(country.properties.totalSales)
    );

    if (legendItem != null) {
      country.properties.color = legendItem.color;
    }
  }

  function loadMapData() {
    const mapCountries = features;

    //iterate through array of geoJSON objects representing each country in world
    for (let country of mapCountries) {
      let matchedValue;
      //if total sales list that was fetched has valid state
      //guard clause
      if (totalSales) {
        // console.log(totalSales);
        //second for loop to iterate through total sales list from db and match admagic country to geoJSON
        for (let sale of totalSales) {
          if (country.properties.ADMIN == sale._id) {
            //if there is a match assign it to intermediate variable
            matchedValue = sale;
            // console.log("MATCHED OBJECT");
            // console.log(matchedValue);
          }
        }
      }
      //     //DEFAULT VALUES:
      //     //geoJSON layer properties total sales
      country.properties.totalSales = 0;
      // //modal text
      country.properties.totalSalesText = "0";

      //checks if the matched total sales object has valid state
      if (matchedValue != null) {
        //once object enters this conditional the total sales will be isolated and assigned to correct geoJSON country
        console.log(
          "Inside of conditional about to assign sales value to geoJSON"
        );
        //creates intermediate variable
        const assignTotalSales = matchedValue.totalSales;

        // console.log(assignTotalSales);
        //assigns correct total sales to geoJSON object
        country.properties.totalSales = assignTotalSales;
        // console.log("NOW the geoJSON sales is ");
        // console.log(country.properties);
        //assigns total sales to geoJSON object for displaying text on pop up modal
        country.properties.totalSalesText = assignTotalSales;
        // console.log("Map Modal text should display: ");
        // console.log(country.properties.totalSalesText);
      }
      setCountryColor(country);
      // assign finally the geoJSON layer to setCountryBorder that was originally passed when useEffect called the load function
    }
    setCountries(features);
    // console.log(mapCountries);
  }

  if (totalSales) {
    loadMapData();
  }

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <NewMap countries={countries} />
          <MapLegend legendItems={legendItemsInReverse} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
