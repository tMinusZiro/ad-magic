import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import WorldMap from "./WorldMap.jsx";
import UnitedMap from "./UnitedMap.jsx";
import MapLegend from "./MapLegend.jsx";
import { features } from "../borderData/countries.json";

import Loading from "./Loading.jsx";

//importing the component task that brings in the geoJSON file
//task will also handle all map data gathering and parsing and then send it to the map
// import NewLoadMap from "../mapTasks/NewLoadMap.jsx";
//legend items - part of legends class
import legendItems from "../entities/LegendItems";
import MapBurger from "./MapBurger.jsx";

const HomePage = ({getWorldData, setGetWorldData, getUSData, setGetUSData, region, usBorderData}) => {
  //list of countries
  const [countries, setCountries] = useState([]);
  //total sales
  const [totalSales, setTotalSales] = useState();
  const [totalUSSales, setTotalUSSales] = useState();
  const [openLegend, setOpenLegend] = useState(false);
  const [loadUnitedMap, setLoadUnitedMap] = useState(false);
  //reverse the array so that it's in descending order
  const legendItemsInReverse = [...legendItems].reverse();
  //use to trigger the loadMap() function
  const [loadMap, setLoadMap] = useState(false);
  const [states, setStates] = useState([])

  // fetch array of objects from db for each  country admagic does business with and total sales for that country
  useEffect(() => {
    if (getWorldData) {
      let interArray = [];
      fetch(`/show-sales/`)
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
            setLoadMap(true);
            setGetWorldData(false);
          });
    }
    if (getUSData) {
      let interArray = [];
      fetch(`/show-us`)
        .then((res) => res.json())
        .then((list) => {
          //push each sales item into the intermediate array
          list.forEach((countrySale) => {
            interArray.push(countrySale);
          });
          //set totalSales to be the inner array
          setTotalUSSales(interArray);
          //trigger the loadMap() function
          //conditional for which map to load
            setLoadUnitedMap(true);
            setGetUSData(false);
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
    for (let usState of usBorderData) {
      let usMatchedValue;
      if (totalUSSales) {
        //second for-loop to iterate through total sales list from db and match admagic US states to geoJSON
        for (let sale of totalUSSales) {
          if (usState.properties.name === sale._id) {
            //if there is a match assign it to intermediate variable
            usMatchedValue = sale;
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
        //creates intermediate variable
        const assignUSTotalSales = usMatchedValue.totalSales;

        //assigns correct total sales to geoJSON object
        usState.properties.totalSales = assignUSTotalSales;
        //assigns total sales to geoJSON object for displaying text on pop up modal
        usState.properties.totalSalesText = assignUSTotalSales;
      }
      setCountryColor(usState);
      // assign finally the geoJSON layer to setCountries that was originally passed when useEffect called the load function
    }
    setStates(usBorderData);
  }

  function loadMapData() {
    //Conditional branch for rendering just US State geoJSON data

    const mapCountries = features;

    //iterate through array of geoJSON objects representing each country in world
    for (let country of mapCountries) {
      let matchedValue;
      //if total sales list that was fetched has valid state
      //guard clause
      if (totalSales) {
        //second for loop to iterate through total sales list from db and match admagic country to geoJSON
        for (let sale of totalSales) {
          if (country.properties.ADMIN === sale._id) {
            //if there is a match assign it to intermediate variable
            matchedValue = sale;
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
        //creates intermediate variable
        const assignTotalSales = matchedValue.totalSales;

        //assigns correct total sales to geoJSON object
        country.properties.totalSales = assignTotalSales;
        //assigns total sales to geoJSON object for displaying text on pop up modal
        country.properties.totalSalesText = assignTotalSales;
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
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>

              (countries.length === 0) ? (
                <Loading />
              ) : (
                <div id="map-component-wrapper">
                  <div>
                    <WorldMap
                      region={region}
                      countries={countries}
                      loadMap={loadMap}
                      getWorldData = {getWorldData}
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
              states.length === 0 ? (
                <Loading />
              ) : (
                <div id="map-component-wrapper">
                  <div>
                    <UnitedMap
                      region={region}
                      states = {states}
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
    </div>
  );
};

export default HomePage;
