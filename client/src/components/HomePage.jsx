import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import WorldMap from "./WorldMap.jsx";
import UnitedMap from "./UnitedMap.jsx";
import MapLegend from "./MapLegend.jsx";
import { features } from "../borderData/countries.json";

import Loading from "./Loading.jsx";

//array of class instances for building each rectangle in the color legend range
import legendItems from "../entities/LegendItems";

const HomePage = ({ getMapData, setGetMapData, region, usBorderData }) => {
  //list of countries
  const [countries, setCountries] = useState([]);
  //total sales
  const [totalSales, setTotalSales] = useState();
  const [totalUSSales, setTotalUSSales] = useState();

  const [loadUnitedMap, setLoadUnitedMap] = useState(false);
  //reverse the array so that it's in descending order
  const legendItemsInReverse = [...legendItems].reverse();
  //use to trigger the loadMap() function
  const [loadMap, setLoadMap] = useState(false);
  const [states, setStates] = useState([]);

  // fetch array of objects from db for each  country admagic does business with and total sales for that country
  useEffect(() => {
    if (getMapData) {
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
          setLoadMap(true);
        });
      let interStateArray = [];
      fetch(`/show-us`)
        .then((res) => res.json())
        .then((list) => {
          //push each sales item into the intermediate array
          list.forEach((countrySale) => {
            interStateArray.push(countrySale);
          });
          //set totalSales to be the inner array
          setTotalUSSales(interStateArray);
          //trigger the loadMap() function
          //conditional for which map to load
          setLoadUnitedMap(true);
          setGetMapData(false);
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
    let BorderData = usBorderData;
    for (let usState of BorderData) {
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
    setStates(BorderData);
  }

  function loadMapData() {
    //Conditional branch for rendering just US State geoJSON data

    // const mapCountries = features ;

    //iterate through array of geoJSON objects representing each country in world
    // for (let country of mapCountries) {
    let mapCountries = features.map((country) => {
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
      return country;
      // assign finally the geoJSON layer to setCountryBorder that was originally passed when useEffect called the load function
    });

    setCountries(mapCountries);
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
            countries.length === 0 ? (
              <Loading />
            ) : (
              <div id="map-component-wrapper">
                <div>
                  <WorldMap
                    region={region}
                    countries={countries}
                    loadMap={loadMap}
                  />
                </div>
                <div>
                  <MapLegend legendItems={legendItemsInReverse} />
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
                    states={states}
                    loadUnitedMap={loadUnitedMap}
                  />
                </div>
                <div>
                  <MapLegend legendItems={legendItemsInReverse} />
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
