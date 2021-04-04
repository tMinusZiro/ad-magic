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
//data set for global country borders
import { features } from "../borderData/countries.json";
//data set for us state borders
// import { features } from "../borderData/usBorder.json";
import { useState, useEffect } from "react";
import RegionZoom from "./RegionZoom";

const Map = (props) => {
  console.log("props.region:", props.region);

  const [worldMapCenter, setWorldMapCenter] = useState([40, 20]);
  const [mapCenter, setMapCenter] = useState(worldMapCenter);
  const [mapZoom, setMapZoom] = useState(2);
  const [newMapZoom, setNewMapZoom] = useState();
  const [newMapCenter, setNewMapCenter] = useState();

  //state for json country border data

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

  useEffect(() => {
    if (props.region === "United States") {
      setNewMapCenter([38.0, -97.0]);
      setNewMapZoom(3);
    } else if (props.region === "Africa") {
      setNewMapCenter([6.611111, 20.939444]);
      setNewMapZoom(3);
    } else if (props.region === "Asia") {
      setNewMapCenter([35.86166, 104.195397]);
      setNewMapZoom(3);
    } else if (props.region === "Australia") {
      setNewMapCenter([-25.274398, 133.775136]);
      setNewMapZoom(3);
    } else if (props.region === "Europe") {
      console.log("entering else if");
      setNewMapCenter([49.817492, 15.472962]);
      setNewMapZoom(3);
    } else if (props.region === "North America") {
      setNewMapCenter([38.0, -97.0]);
      setNewMapZoom(3);
    } else if (props.region === "South America") {
      setNewMapCenter([-14.235004, -51.92528]);
      setNewMapZoom(3);
    } 
    else {
      setNewMapCenter([40, 20])
      setNewMapZoom(2)
    }
  }, [props.region]);

  //first argument is the feature for GeoJSON we are dealing with
  //second is the layer => thing drawn on screen

  function onEachState(countryBorder, layer) {
    // if (props.loadMap) {
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
    // }
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
          style={{ height: "64vh", width: "60vw" }}
        >
          {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
          <GeoJSON
            data={props.countries}
            onEachFeature={onEachState}
            style={geoJSONStyle}
          />
          {newMapCenter && newMapZoom ? (
            <RegionZoom center={newMapCenter} zoom={newMapZoom} />
          ) : null}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
