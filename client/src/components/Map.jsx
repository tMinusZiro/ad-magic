// import React from "react";
// //this import brings in the necessary css that stitches the map tiles together
// //alternative to providing style sheet link in public/index.html
// import "leaflet/dist/leaflet.css";
// import "./MagicMap.css";
// // import LoadBorderTask from "../mapTasks/LoadBorderTask.js";
// import {
//   MapContainer,
//   TileLayer,
//   Polygon,
//   Marker,
//   GeoJSON,
// } from "react-leaflet";
// //data set for global country borders
// import { features } from "../borderData/countries.json";
// //data set for us state borders
// // import { features } from "../borderData/usBorder.json";
// import { useState, useEffect } from "react";

// const Map = (props) => {
//   const [worldMapCenter, setWorldMapCenter] = useState([20, 100]);
//   const [mapCenter, setMapCenter] = useState(worldMapCenter);
//   const [mapZoom, setMapZoom] = useState(2);
//   //state for json country border data
//   const [countryBorder, setCountryBorder] = useState(features);
//   const [selectedContinent, setSelectedContinent] = useState();
//   const [countryColor, setCountryColor] = useState({});
//   const [interTotalSales, setInterTotalSales] = useState();
//   //center coordinates for main continents
//   const [continentCenter, setContinentCenter] = useState({
//     //Lat/Lon
//     southAmerica: {
//       center: [-14.235004, -51.92528],
//       zoom: 3,
//     },
//     northAmerica: [38.0, -97.0],
//     europe: [49.817492, 15.472962],
//     africa: [6.611111, 20.939444],
//     asia: [35.86166, 104.195397],
//     australia: [-25.274398, 133.775136],
//   });

//   const [usCenter, setUSCenter] = useState([38.0, -97.0]);
//   const [officialSales, setOfficialSales] = useState();
//   //sets up class task that will prep the border data
//   class LoadBorderTask {
//     setState = null;
//     mapCountries = features;

//     //load method that will accept a state change function
//     load = (setState) => {
//       this.setState = setState;
//       // setState(features); //works but do not want to call it right away
//       //then that state change function will take the destructured features import from the geojson
//     };

//     loopTotalSales() {
//       console.log("mapCountries = :");
//       console.log(this.mapCountries);
//       // console.log("Inside of loopTotalSales Method accessing props totalsales");
//       console.log(props.totalSales);
//       let matchedSalesValue;
//       for (let i = 0; i < this.mapCountries.length; i++) {
//         // console.log(props.totalSales);
//         const mapCountry = this.mapCountries[i];

//         if (props.totalSales) {
//           // for (let j = 0; j < props.totalSales.length; j++) {
//           //   if (mapCountry.properties.ADMIN === props.totalSales[j]._id) {
//           //     matchedSalesValue = props.totalSales[j].totalSales
//           //     console.log()
//           //   }
//           // }

//           const matchedSalesValue = props.totalSales.find(
//             (element) => element._id === mapCountry.properties.ADMIN
//           );
//           // console.log("matched sales value");
//           // console.log(matchedSalesValue);

//           //DEFAULT VALUES:
//           //geoJSON layer properties total sales
//           mapCountry.properties.totalSales = 0;
//           //modal text
//           mapCountry.properties.totalSalesText = "0";

//           if (matchedSalesValue != null) {
//             const assignTotalSales = matchedSalesValue.totalSales;
//             // console.log(
//             //   "Inside of conditional about to assign sales value to geoJSON"
//             // );
//             // console.log(officialSales);
//             mapCountry.properties.totalSales = assignTotalSales;
//             // console.log("NOW the geoJSON sales is ");
//             // console.log(mapCountry.properties.officialSales);

//             mapCountry.properties.totalSalesText = assignTotalSales;
//             // console.log("Map Modal text should display: ");
//             // console.log(mapCountry.properties.totalSalesText);
//           }
//         }
//       }
//       //assign finally the geoJSON layer to setCountryBorder that was originally passed when useEffect called the load function
//       this.setState(this.mapCountries);
//     }
//   }

//   //function that will create a new instance of LoadBorderData class
//   const load = () => {
//     //instance created
//     const loadBorderTask = new LoadBorderTask();
//     //accessing instance method load and passing in the setter function for countryBorderUS
//     loadBorderTask.load(setCountryBorder);
//     loadBorderTask.loopTotalSales();
//   };
//   //when page loads fires once to call the load function which in turn updates the country border state
//   useEffect(() => {
//     load();
//   });

//   // countryBorder.properties.color
//   //manages style of geoJSON child component
//   const geoJSONStyle = () => {
//     return {
//       fillColor: "#5f5fdbea", // color of country
//       weight: 1.5, //thickness of country border lines
//       opacity: 1,

//       color: "white", //color of country border line
//       fillOpacity: 1,
//     };
//   };

//   //first argument is the feature for GeoJSON we are dealing with
//   //second is the layer => thing drawn on screen

//   function onEachState(countryBorder, layer) {
//     console.log("Inside of feature function");
//     console.log(countryBorder.properties);
//     //fill color on geojson layer
//     layer.options.fillColor = countryBorder.properties.color;
//     const countryName = countryBorder.properties.ADMIN;

//     console.log(countryName);
//     //will show total sales of each country when country is clicked
//     console.log("total sales number");
//     console.log(countryBorder.properties.totalSales);
//     const totalSales = countryBorder.properties.totalSales;

//     //info on popup when country is clicked
//     layer.bindPopup(`${totalSales} ${countryName}  `);
//   }

//   //----------function that changes style of map based on total sales----------//
//   //steps
//   //GeoJSON layer will rely on the country object.totalsales
//   //fill color will change based on the total sales number

//   return (
//     <>
//       <MapContainer
//         center={mapCenter}
//         scrollWheelZoom={false}
//         // center={[20, 100]}
//         zoom={mapZoom}
//         style={{ height: "90vh", width: "90vw" }}
//       >
//         {/* <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         /> */}

//         {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
//         <GeoJSON
//           data={countryBorder}
//           onEachFeature={onEachState}
//           style={geoJSONStyle}
//         />
//       </MapContainer>
//     </>
//   );
// };

// export default Map;
