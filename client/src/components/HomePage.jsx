import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WorldMap from "./WorldMap.jsx";
import UnitedMap from "./UnitedMap.jsx";
import MapLegend from "./MapLegend.jsx";
import { features } from "../borderData/countries.json";

import Loading from "./Loading.jsx";

//importing the component task that brings in the geoJSON file
//task will also handle all map data gathering and parsing and then send it to the map
import NewLoadMap from "../mapTasks/NewLoadMap.jsx";
//legend items - part of legends class
import legendItems from "../entities/LegendItems";
import MapBurger from "./MapBurger.jsx";

const HomePage = (props) => {
  //list of countries
  const [countries, setCountries] = useState([]);
  //total sales
  const [totalSales, setTotalSales] = useState();
  const [openLegend, setOpenLegend] = useState(false);
  const [loadUnitedMap, setLoadUnitedMap] = useState(false);
  const [interUS, setInterUS] = useState(props.usBorderData);
  //reverse the array so that it's in descending order
  const legendItemsInReverse = [...legendItems].reverse();
  //intermediate array for totalSales
  let interArray = [];
  //use to trigger the loadMap() function
  const [loadMap, setLoadMap] = useState(false);

  // fetch array of objects from db for each  country admagic does business with and total sales for that country
  useEffect(() => {
    if (props.getData) {
      let interArray = [];

      fetch(`/show-sales/${props.region}`)
        .then((res) => res.json())
        .then((list) => {
          //push each sales item into the intermediate array
          list.forEach((countrySale) => {
            interArray.push(countrySale);
          });

          //set totalSales to be the inner array
          setTotalSales(interArray);
          //trigger the loadMap() function
          //conditional for which map to load
          if (props.region === "United States") {
            setLoadUnitedMap(true);
            props.setGetData(false);
          } else {
            setLoadMap(true);
            props.setGetData(false);
          }
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

  function loadUnitedData() {
    console.log("I am in the special US branch");
    console.log("US geoJSON");
    console.log(props.usBorderData);
    for (let usState of props.usBorderData) {
      let usMatchedValue;
      if (totalSales) {
        //second for-loop to iterate through total sales list from db and match admagic US states to geoJSON
        for (let sale of totalSales) {
          if (usState.properties.name == sale._id) {
            //if there is a match assign it to intermediate variable
            usMatchedValue = sale;
            // console.log("MATCHED OBJECT");
            // console.log(usMatchedValue);
          }
        }
      }

      //DEFAULT VALUES:
      //geoJSON layer properties total sales
      usState.properties.totalSales = 0;
      //modal text
      usState.properties.totalSalesText = "0";
      //checks if the matched total sales object has valid state
      if (usMatchedValue != null) {
        //once object enters this conditional the total sales will be isolated and assigned to correct geoJSON country
        console.log(
          "Inside of conditional about to assign sales value to geoJSON"
        );
        //creates intermediate variable
        const assignUSTotalSales = usMatchedValue.totalSales;

        // console.log(assignTotalSales);
        //assigns correct total sales to geoJSON object
        usState.properties.totalSales = assignUSTotalSales;
        // console.log("NOW the geoJSON sales is ");
        // console.log(country.properties);
        //assigns total sales to geoJSON object for displaying text on pop up modal
        usState.properties.totalSalesText = assignUSTotalSales;
        // console.log("Map Modal text should display: ");
        // console.log(country.properties.totalSalesText);
      }
      setCountryColor(usState);
      // assign finally the geoJSON layer to setCountries that was originally passed when useEffect called the load function
    }
    console.log("US BORDER DATE B4 setCOUNTRY");
    console.log(props.usBorderData);
    setCountries(props.usBorderData);
  }

  function loadMapData() {
    console.log("Entering Load Map Data");
    //Conditional branch for rendering just US State geoJSON data

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
      //DEFAULT VALUES:
      //geoJSON layer properties total sales
      country.properties.totalSales = 0;
      //modal text
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
  }

  if (loadMap) {
    loadMapData();
    setLoadMap(false);
  }
  if (loadUnitedMap) {
    loadUnitedData();
    setLoadUnitedMap(false);
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              // console.log("Inside Browser Router / countries = ");
              // console.log(countries);

              countries.length === 0 ? (
                <Loading />
              ) : (
                <div id="map-component-wrapper">
                  {console.log("INSIDE  /ROUTE region =")}
                  {console.log(props.region)}
                  <div>
                    <WorldMap
                      region={props.region}
                      countries={countries}
                      loadMap={loadMap}
                    />
                  </div>
                  <div>
                    <MapLegend
                      legendItems={legendItemsInReverse}
                      openLegend={openLegend}
                      setOpenLegend={setOpenLegend}
                    />
                  </div>
                  <div id="map-burger-wrapper">
                    <MapBurger
                      setOpenLegend={setOpenLegend}
                      openLegend={openLegend}
                    />
                  </div>
                </div>
              )
            }
          />
          <Route
            exact
            path="/united"
            render={(props) =>
              countries.length === 0 ? (
                <Loading />
              ) : (
                <div id="map-component-wrapper">
                  <div>
                    {console.log("INSIDE UNITED SWITCH Statement")}
                    {console.log(props.usBorderData)}
                    <UnitedMap
                      region={props.region}
                      interUS={interUS}
                      loadUnitedMap={loadUnitedMap}
                    />
                  </div>
                  <div>
                    <MapLegend
                      legendItems={legendItemsInReverse}
                      openLegend={openLegend}
                      setOpenLegend={setOpenLegend}
                    />
                  </div>
                  <div id="map-burger-wrapper">
                    <MapBurger
                      setOpenLegend={setOpenLegend}
                      openLegend={openLegend}
                    />
                  </div>
                </div>
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default HomePage;
