import React from "react";
//this import brings in the necessary css that stitches the map tiles together
//alternative to providing style sheet link in public/index.html
import "leaflet/dist/leaflet.css";
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

const Map = () => {
  const [worldMapCenter, setWorldMapCenter] = useState([20, 100]);
  const [mapCenter, setMapCenter] = useState(worldMapCenter);
  const [mapZoom, setMapZoom] = useState(2);
  const [countryBorder, setCountryBorder] = useState([features]);
  const [selectedContinent, setSelectedContinent] = useState();
  //center coordinates for main continents
  const [continentCenter, setContinentCenter] = useState({
    //Lat/Lon
    southAmerica: {
      center: [-14.235004, -51.92528],
      zoom: 3,
    },
    northAmerica: [38.0, -97.0],
    europe: [49.817492, 15.472962],
    africa: [6.611111, 20.939444],
    asia: [35.86166, 104.195397],
    australia: [-25.274398, 133.775136],
  });

  const [usCenter, setUSCenter] = useState([38.0, -97.0]);

  //sets up class task that will prep the border data
  class LoadBorderData {
    //load method that will accept a state change function
    load = (setState) => {
      //then that state change function will take the destructured features import from the geojson
      setState(features);
    };
  }

  //function that will create a new instance of LoadBorderData class
  const load = () => {
    //instance created
    const loadBorderData = new LoadBorderData();
    //accessing instance method load and passing in the setter function for countryBorderUS
    loadBorderData.load(setCountryBorder);
  };
  //when page loads fires once to call the load function which in turn updates the country border state
  useEffect(load, []);

  //first argument is the feature for GeoJSON we are dealing with
  //second is the layer => thing drawn on screen
  const onEachState = (countryBorder, layer) => {
    layer.options.fillColor = countryBorder.properties.color;

    const countryName = countryBorder.properties.ADMIN;

    layer.bindPopup(`${countryName} Total Sales Data `);
  };

  //----------function that changes style of map based on total sales----------//
  //steps
  //GeoJSON layer will rely on the country object.totalsales
  //fill color will change based on the total sales number

  //function decides on color of country based on total sales
  const countryColor = (totalSales) => {
    if (totalSales < 2_500_000) {
      return "08519c";
    } else if (totalSales < 2_000_000) {
      return "3182bd";
    } else if (totalSales < 1_500_000) {
      return "6baed6";
    } else if (totalSales < 1_000_000) {
      return "bdd7e7";
    } else if (totalSales < 500_000) {
      return "eff3ff";
    } else {
      return "08519c";
    }
  };

  //manages style of geoJSON child component
  const geoJSONStyle = (country) => {
    return {
      fillColor: countryColor(country.totalSales),
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <>
      <MapContainer
        center={mapCenter}
        // center={[20, 100]}
        zoom={mapZoom}
        style={{ height: "90vh", width: "1000px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
        <GeoJSON
          data={countryBorder}
          onEachFeature={onEachState}
          // style={geoJSONStyle}
        />
      </MapContainer>
    </>
  );
};

export default Map;
