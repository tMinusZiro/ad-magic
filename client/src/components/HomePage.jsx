import React from "react";
import { useState, useEffect } from "react";
import NewMap from "./NewMap.jsx";
import MapLegend from "./MapLegend.jsx";
import Loading from "./Loading.jsx";
//importing the component task that brings in the geoJSON file
//task will also handle all map data gathering and parsing and then send it to the map
import NewLoadMap from "../mapTasks/NewLoadMap.jsx";
const HomePage = () => {
  //list of countries
  const [countries, setCountries] = useState([]);
  const [totalSales, setTotalSales] = useState();

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
      <NewLoadMap
        // totalSales={totalSales}
        // setTotalSales={setTotalSales}
        countries={countries}
        setCountries={setCountries}
      />
    </div>
  );
};

export default HomePage;
