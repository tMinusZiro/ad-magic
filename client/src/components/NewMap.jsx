import React from "react";
//this import brings in the necessary css that stitches the map tiles together
//alternative to providing style sheet link in public/index.html
import "leaflet/dist/leaflet.css";
import "./MagicMap.css";
// import LoadBorderTask from "../mapTasks/LoadBorderTask.js";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  GeoJSON,
} from "react-leaflet";
import MapBurger from "./MapBurger.jsx";
//data set for global country borders
import { features } from "../borderData/countries.json";
//data set for us state borders
// import { features } from "../borderData/usBorder.json";
import { useState, useEffect } from "react";

const Map = ({ countries }) => {
  console.log("Countries Destructured in NEW MAP");
  console.log(countries);
  const [worldMapCenter, setWorldMapCenter] = useState([40, 20]);
  const [mapCenter, setMapCenter] = useState(worldMapCenter);
  const [mapZoom, setMapZoom] = useState(2);
  //state for json country border data
  // const [openLegend, setOpenLegend] = useState(false);
  const [usCenter, setUSCenter] = useState([38.0, -97.0]);
  const [officialSales, setOfficialSales] = useState();

  // countryBorder.properties.color
  //manages style of geoJSON child component
  const geoJSONStyle = () => {
    return {
      fillColor: "white", // color of country
      weight: 1.2, //thickness of country border lines
      color: "blue", //color of country border line
      fillOpacity: 1,
    };
  };

  //first argument is the feature for GeoJSON we are dealing with
  //second is the layer => thing drawn on screen

  function onEachState(countryBorder, layer) {
    // console.log("Inside of feature function");
    // console.log(countryBorder.properties);
    //fill color on geojson layer
    layer.options.fillColor = countryBorder.properties.color;
    const countryName = countryBorder.properties.ADMIN;

    // console.log(countryName);
    //will show total sales of each country when country is clicked
    // console.log("total sales number");
    // console.log(countryBorder.properties.totalSales);
    const totalSales = countryBorder.properties.totalSales;

    //info on popup when country is clicked
    layer.bindPopup(`${totalSales} ${countryName}`);
  }

  //----------function that changes style of map based on total sales----------//
  //steps
  //GeoJSON layer will rely on the country object.totalsales
  //fill color will change based on the total sales number

  return (
    <>
      <div id="map-wrapper">
        <MapContainer
          center={mapCenter}
          scrollWheelZoom={false}
          // center={[20, 100]}
          zoom={mapZoom}
          style={{ height: "60vh", width: "60vw" }}
        >
          <div>This is the Map </div>
          {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
          <GeoJSON
            data={countries}
            onEachFeature={onEachState}
            style={geoJSONStyle}
          />
        </MapContainer>
        {/* <MapBurger setOpenLegend={setOpenLegend} openLegend={openLegend} /> */}
      </div>
    </>
  );
};

export default Map;
