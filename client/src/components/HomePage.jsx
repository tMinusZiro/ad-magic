import React from "react";
import { useState, useEffect } from "react";
import NewMap from "./NewMap.jsx";
import MapLegend from "./MapLegend.jsx";
import Loading from "./Loading.jsx";
//importing the component task that brings in the geoJSON file
//task will also handle all map data gathering and parsing and then send it to the map
import LoadBorderTask from "../mapTasks/LoadBorderTask.js";
import LoadTotalSalesTask from "../mapTasks/LoadTotalSalesTask.js";

const HomePage = () => {
  //list of countries
  const [countries, setCountries] = useState([]);

  //   function that will create a new instance of LoadBorderData class
  const load = () => {
    //instance created
    const loadBorderTask = new LoadBorderTask();
    //accessing instance method load and passing in the setter function for countryBorderUS
    loadBorderTask.load(setCountries);
    loadBorderTask.loopTotalSales(); //do I need this?
  };

  //   when page loads fires once to call the load function which in turn updates the country border state
  useEffect(load, []);

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <NewMap countries={countries} />
          <MapLegend />
        </div>
      )}
      {/* <LoadTotalSalesTask
        totalSalesList={totalSalesList}
        setTotalSalesList={setTotalSalesList}
      /> */}
    </div>
  );
};

export default HomePage;
