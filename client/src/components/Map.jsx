import React from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import borderData from "../borderData/statesData.js";
import multigonData from "../borderData/multigonData.js";

const Map = () => {
  //tunnel into border data object
  //map the array of objects
  //iterate through each object and then tunnel into the coordinates array
  //coordinates[0] then do a second map
  //in the second map I will return a polygon filled with state border data
  //this should produce 51 polygons with outlined borders
  //this should produce 51 polygons with outlined borders

  //each state object is represented by usState
  let stateOutline = borderData.features.map((usState) => {
    console.log(usState.geometry.type);
    //  if (usState.geometry.type === "MultiPolygon") {
    //     coords.map((multiPoly) => {
    //       return [multiPoly[1], multiPoly[0]];
    //     });
    //   }
    //stateCord is the array of array for indiv state cords
    return usState.geometry.coordinates[0].map((coords) => {
      return [coords[1], coords[0]];
    });
  });

  let multiPolygon = multigonData.geometry.coordinates.map((usState) => {
    return [usState[1], usState[0]];
  });

  return (
    <>
      <MapContainer
        center={[38.0, -97.0]}
        zoom={4}
        style={{ height: "600px", width: "900px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {borderData.features.map((usState) => {
          console.log(usState.geometry.type);
          return usState.geometry.coordinates[0].map((coords) => {
            return (
              <Polygon
                positions={[coords[1], coords[0]]}
                pathOptions={{ color: "blue", fillOpacity: 0 }}
              />
            );
          });
        })}
      </MapContainer>
    </>
  );
};

export default Map;
