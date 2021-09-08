import React from "react";
//this import brings in the necessary css that stitches the map tiles together
//alternative to providing style sheet link in public/index.html
import "leaflet/dist/leaflet.css";
import "./MagicMap.css";
import { MapContainer, GeoJSON } from "react-leaflet";
import { useState, useEffect } from "react";
import RegionZoom from "./RegionZoom";

const Map = (props) => {
  const mapCenter = [39, -29];
  const mapZoom = 1.5; 
  const [worldMapZoom, setWorldMapZoom] = useState();
  const [newWorldCenter, setWorldCenter] = useState();

  //manages style of geoJSON child component
  const geoJSONStyle = () => {
    return {
      fillColor: "white", // color of country
      weight: 0.3, //thickness of country border lines
      color: "#335171", //color of country border line
      fillOpacity: 1,
    };
  };

  //when region is changed, send a new center and zoom into the map view
  useEffect(() => {
    if (props.region === "United States") {
      setWorldCenter([37.0902, -95.7129]);
      setWorldMapZoom(4);
    } else if (props.region === "Africa") {
      setWorldCenter([6.611111, 20.939444]);
      setWorldMapZoom(3.3);
    } else if (props.region === "Asia") {
      setWorldCenter([55, 85]);
      setWorldMapZoom(2.9);
    } else if (props.region === "Australia") {
      setWorldCenter([-29.274398, 151.775136]);
      setWorldMapZoom(3.7);
    } else if (props.region === "Europe") {
      setWorldCenter([55, 32]);
      setWorldMapZoom(3.3);
    } else if (props.region === "North America") {
      setWorldCenter([50, -101.2996]);
      setWorldMapZoom(2.5);
    } else if (props.region === "South America") {
      setWorldCenter([-30, -70]);
      setWorldMapZoom(3.48);
    } else {
      setWorldCenter([39, -29]);
      setWorldMapZoom(1.5);
    }
  }, [props.region]);

  //first argument is the feature for GeoJSON we are dealing with
  //second is the layer => thing drawn on screen
  function onEachState(countryBorder, layer) {
    //fill color on geojson layer
    layer.options.fillColor = countryBorder.properties.color;
    const countryName = countryBorder.properties.ADMIN;
    //will show total sales of each country when country is clicked
    const totalSales = countryBorder.properties.totalSales;
    //info on popup when country is clicked
    layer.bindPopup(`${countryName} Total Sales:
    $${Math.round(totalSales)} `);
  }

  //----------function that changes style of map based on total sales----------//
  //GeoJSON layer will rely on the country object.totalsales
  //fill color will change based on the total sales number

  return (
    <>
      <div id="map-wrapper">
        <MapContainer
          center={mapCenter}
          scrollWheelZoom={false}
          zoom={mapZoom}
          id = "map-container"
          // style={{
          //   borderTopLeftRadius: "5px",
          //   borderTopRightRadius: "5px",
          //   height: "60vh",
          // }}
        >
          {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
          <GeoJSON
            data={props.countries}
            onEachFeature={onEachState}
            style={geoJSONStyle}
          />
          {newWorldCenter && worldMapZoom ? (
            <RegionZoom center={newWorldCenter} zoom={worldMapZoom} />
          ) : null}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
