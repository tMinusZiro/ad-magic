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

const Map = (props) => {
  const [worldMapCenter, setWorldMapCenter] = useState([20, 100]);
  const [mapCenter, setMapCenter] = useState(worldMapCenter);
  const [mapZoom, setMapZoom] = useState(2);
  //state for json country border data
  const [countryBorder, setCountryBorder] = useState();
  const [selectedContinent, setSelectedContinent] = useState();
  const [countryColor, setCountryColor] = useState({});

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

  console.log("See props sales list below ");
  console.log(props.totalSales);

  //sets up class task that will prep the border data
  class LoadBorderTask {
    

      setState = null;
      mapCountries = features;

    

      
    
    //load method that will accept a state change function
    load = (setState) => {
      this.setState = setState;
      //then that state change function will take the destructured features import from the geojson
    };

    loopTotalSales() {
      for (let country of this.mapCountries) {
        const mapCountry = this.mapCountries[country];
        const fetchedTotalSalesList = props.totalSales.find((matchedCountry) => matchedCountry._id === mapCountry.properties.ADMIN)

mapCountry.properties.totalSales = 0
mapCountry.properties.totalSalesText = "0"

      }

      this.setState(this.MapCountries)

    }
  }

  //function that will create a new instance of LoadBorderData class
  const load = () => {
    //instance created
    const loadBorderTask = new LoadBorderTask();
    //accessing instance method load and passing in the setter function for countryBorderUS
    loadBorderTask.load(setCountryBorder);
  };
  //when page loads fires once to call the load function which in turn updates the country border state
  useEffect(load, []);

  //function decides on color of country based on total sales
  //  const colorPicker = (props) => {

  //   props.totalSales.forEach((objCountry) => {

  //     if (totalSales < 1_000_000) {
  //  "#08519c"
  // })
  //     } else if (totalSales < 500_000) {
  //       return "3182bd"
  //       })

  //     } else if (totalSales < 250_000) {
  //       return "6baed6"
  //       })

  //     } else if (objCountry.totalSales < 125_000) {
  //       return setCountryColor({
  //         objCountry._id: "bdd7e7"
  //       })

  //     } else if (objCountry.totalSales < 62_000) {
  //       return setCountryColor({
  //         objCountry._id: "eff3ff"
  //       })

  //     } else {
  //       return "08519c";
  //     }

  //   })

  // };

  // countryBorder.properties.color
  //manages style of geoJSON child component
  const geoJSONStyle = () => {
    return {
      fillColor: "#5f5fdbea", // color of country
      weight: 1.5, //thickness of country border lines
      opacity: 1,

      color: "white", //color of country border line
      fillOpacity: 1,
    };
  };

  //first argument is the feature for GeoJSON we are dealing with
  //second is the layer => thing drawn on screen
  const onEachState = (countryBorder, layer) => {
    //fill color on geojson layer
    layer.options.fillColor = countryBorder.properties.color;
    const countryName = countryBorder.properties.ADMIN;
    //will show total sales of each country when country is clicked
    const totalSalesText = countryBorder.properties.totalSalesText;
    //info on popup when country is clicked
    layer.bindPopup(`${countryName} ${totalSalesText} `);
  };

  //----------function that changes style of map based on total sales----------//
  //steps
  //GeoJSON layer will rely on the country object.totalsales
  //fill color will change based on the total sales number

  return (
    <>
      <MapContainer
        center={mapCenter}
        scrollWheelZoom={false}
        // center={[20, 100]}
        zoom={mapZoom}
        style={{ height: "90vh", width: "90vw" }}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}

        {/*This GeoJson is overlaying polygons onto the tilelayer => polygons are the borders of US States */}
        <GeoJSON
          data={countryBorder}
          onEachFeature={onEachState}
          style={geoJSONStyle}
        />
      </MapContainer>
    </>
  );
};

export default Map;
