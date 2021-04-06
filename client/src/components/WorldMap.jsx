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
import RegionZoom from "./RegionZoom";

const Map = (props) => {
  const [worldMapCenter, setWorldMapCenter] = useState([39, -29]);
  const [mapCenter, setMapCenter] = useState(worldMapCenter);
  const [mapZoom, setMapZoom] = useState(1.5);
  const [worldMapZoom, setWorldMapZoom] = useState();
  const [newWorldCenter, setWorldCenter] = useState();

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

  //when region is changed, send a new center and zoom into the map view
  useEffect(() => {
    if (props.region === "United States") {
      setWorldMapCenter([37.0902, -95.7129]);
      setWorldMapZoom(4);
    } else if (props.region === "Africa") {
      setWorldMapCenter([6.611111, 20.939444]);
      setWorldMapZoom(3.3);
    } else if (props.region === "Asia") {
      setWorldMapCenter([34.0479, 100.6197]);
      setWorldMapZoom(3);
    } else if (props.region === "Australia") {
      setWorldMapCenter([-25.274398, 133.775136]);
      setWorldMapZoom(4);
    } else if (props.region === "Europe") {
      setWorldMapCenter([54.526, 15.2551]);
      setWorldMapZoom(3.5);
    } else if (props.region === "North America") {
      setWorldMapCenter([47.1164, -101.2996]);
      setWorldMapZoom(3);
    } else if (props.region === "South America") {
      setWorldMapCenter([-20, -55.4915]);
      setWorldMapZoom(3.5);
    } else {
      setWorldMapCenter([39, -29]);
      setWorldMapZoom(1.5);
    }
  }, [props.region]);

  //first argument is the feature for GeoJSON we are dealing with
  //second is the layer => thing drawn on screen
  function onEachState(countryBorder, layer) {
    if (props.region === "United States") {
      //fill color on geojson layer
      layer.options.fillColor = countryBorder.properties.color;
      const usStateName = countryBorder.properties.name;
      const totalSales = countryBorder.properties.totalSales;

      //info on popup when country is clicked
      layer.bindPopup(`${totalSales} ${usStateName}`);
    } else {
      //fill color on geojson layer
      layer.options.fillColor = countryBorder.properties.color;
      const countryName = countryBorder.properties.ADMIN;
      //will show total sales of each country when country is clicked
      const totalSales = countryBorder.properties.totalSales;

      //info on popup when country is clicked
      layer.bindPopup(`${countryName} Total Sales:
    $${Math.round(totalSales)} `);
    }
  }

  function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });
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
          zoom={mapZoom}
          style={{ height: "64vh", width: "60vw" }}
        >
          {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
          <GeoJSON
            data={props.countries}
            onEachFeature={onEachState}
            style={geoJSONStyle}
          />
          {/* {newWorldCenter && newWorldZoom ? (
            <RegionZoom center={newWorldCenter} zoom={newWorldZoom} />
          ) : null} */}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
