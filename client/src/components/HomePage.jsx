import React from "react";
import { useState, useEffect } from "react";
import NewMap from "./NewMap.jsx";
import MapLegend from "./MapLegend.jsx";
import { features } from "../borderData/countries.json";
import Loading from "./Loading.jsx";
import { Route, Switch, Link } from "react-router-dom";

//importing the component task that brings in the geoJSON file
//task will also handle all map data gathering and parsing and then send it to the map
import NewLoadMap from "../mapTasks/NewLoadMap.jsx";
//legend items - part of legends class
import legendItems from "../entities/LegendItems";

const HomePage = (props) => {
  //list of countries
  const [countries, setCountries] = useState([]);
  //total sales
  const [totalSales, setTotalSales] = useState();
  //reverse the array so that it's in descending order
  const legendItemsInReverse = [...legendItems].reverse();
  //intermediate array for totalSales
  //trigger loadmap() function
  const [loadMap, setLoadMap] = useState(false);
  const [newRegion, setNewRegion] = useState("World")

  console.log(newRegion)
  console.log(props.region, "coming from HomePage")
  // setNewRegion(props.region)

  // fetch array of objects from db for each  country admagic does business with and total sales for that country
  useEffect(() => {
    if (props.getData) {
      let interArray = [];
      fetch(`/show-sales/${props.region}`)
        .then((res) => res.json())
        .then((list) => {
          console.log("inside show-sales fetch")
          //push each sales item into the intermediate array
          list.forEach((countrySale) => {
            interArray.push(countrySale);
          });
          //set totalSales to be the inner array
          setTotalSales(interArray);
          console.log(interArray)
          //trigger the loadMap() function
          setLoadMap(true);
          props.setGetData(false);
        });
    }
  });

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
    console.log("at end of loadMapData()")
  }

  if (loadMap) {
    loadMapData();
    setLoadMap(false);
  }

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <NewMap region = {props.region} newRegion = {newRegion} countries={countries} loadMap = {loadMap} />
          <MapLegend legendItems={legendItemsInReverse} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
