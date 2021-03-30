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
import { features } from "../borderData/statesData.json";
import multigonData from "../borderData/multigonData.js";
import { useState, useEffect } from "react";

const Map = () => {
  const [countryBorderUS, setCountryBorderUS] = useState([]);
  //sets up class task that will prep the border data
  class LoadBorderData {
    //load method that will accept a state change function
    load = (setState) => {
      //then that state change function will take the destructured features import from the geojson
      setState(features);
      j;
    };
  }

  //function that will create a new instance of LoadBorderData class
  const load = () => {
    //instance created
    const loadBorderData = new LoadBorderData();
    //accessing instance method load and passing in the setter function for countryBorderUS
    loadBorderData.load(setCountryBorderUS);
  };

  //tunnel into border data object
  //map the array of objects
  //iterate through each object and then tunnel into the coordinates array
  //coordinates[0] then do a second map
  //in the second map I will return a polygon filled with state border data
  //this should produce 51 polygons with outlined borders
  //this should produce 51 polygons with outlined borders

  //each state object is represented by usState

  // for (let usState of borderData.features) {
  //   for (let i = 0; i < usState.geometry.coordinates.length; i++) {
  //     console.log(usState.geometry.coordinates.length);
  //     console.log(`i = ${i}`);

  //     // let stateOutline = borderData.features.forEach((usState) => {
  //     // console.log(usState.geometry.type);

  //     stateOutline = usState.geometry.coordinates[i].map((coords) => {
  //       return [coords[1], coords[0]];
  //     });
  //   }
  // }

  // console.log(`State Variable = ${stateOutline}`);

  // for (let usState of multigonData.features) {
  //   for (let i = 0; i < usState.geometry.coordinates.length; i++) {
  //     console.log(usState.geometry.coordinates.length);
  //     console.log(`i = ${i}`);

  //     // let stateOutline = borderData.features.forEach((usState) => {
  //     // console.log(usState.geometry.type);
  //     let n = 0;
  //     usState.geometry.coordinates[i].map((coords) => {
  //       console.log(`Coords = ${coords}`);
  //       stateOutline = [coords[n][1], coords[n][0]];
  //       n++;
  //       console.log("StateOutline = ", stateOutline);
  //       return stateOutline;
  //     });
  //   }
  // }

  return (
    <>
      <MapContainer
        center={[38.0, -97.0]}
        zoom={3}
        style={{ height: "600px", width: "900px" }}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}
        <GeoJSON data={[features]} />

        {/* <Polygon
          positions={stateOutline}
          pathOptions={{ color: "blue", fillOpacity: 0 }}
        /> */}
        {/* {borderData.features.map((usState) => {
          console.log(usState.geometry.type);
          return usState.geometry.coordinates[0].map((coords) => {
            return (
              <Polygon
                positions={[coords[1], coords[0]]}
                pathOptions={{ color: "blue", fillOpacity: 0 }}
              />
            );
          });
        })} */}
      </MapContainer>
    </>
  );
};

export default Map;
