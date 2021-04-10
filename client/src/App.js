import "./style/App.css";
import MapToggle from "./components/MapToggle";
import { useState, useEffect } from "react";
// import TotalSales from "./components/TotalSales";
// import Countries from "./components/tasks/Countries";
import backgroundGraph from "./svg/background-graph.svg";
import HomePage from "./components/HomePage.jsx";
import TopDash from "./components/TopDash";
import RightDash from "./components/RightDash";
import BottomDash from "./components/Bottom-dash";
import Header from "./components/Header.jsx";
import { features } from "./borderData/usBorder.json";

function App() {
  //set the region that the map should focus on
  const [region, setRegion] = useState();
  //trigger the data to re-fetch when form is submitted
  const [getUSData, setGetUSData] = useState(true);
  const [getWorldData, setGetWorldData] = useState(true);
  const [usBorderData, setUSBorderData] = useState(features);
  const [getData, setgetData] = useState(false);

  // useEffect(() => {
  //   console.log(window.location.pathname);
  //   if (window.location.pathname === "/united") {
  //     console.log("inside path = /united");
  //     setMap("United States");
  //   } else if (window.location.pathname === "/") {
  //     console.log("inside path name /");
  //     setMap("World");
  //   }
  // }, [map]);

  return (
    <div id="app-wrapper">
      <div id="header-wrapper">
        <Header />
      </div>
      <div id="top-background-color"></div>
      <div id="fake-graph-wrapper">
        <img src={backgroundGraph} />
      </div>
      <div id="map-toggle-wrapper">
        <MapToggle
          setRegion={setRegion}
          region={region}
          getUSData={getUSData}
          setGetUSData={setGetUSData}
          getWorldData={getWorldData}
          setGetWorldData={setGetWorldData}
          setgetData={setgetData}
        />
      </div>
      {/* <div id="data-displays-wrapper"><DataDisplays /></div> */}
      <div id="home-page">
        <HomePage
          getUSData={getUSData}
          setGetUSData={setGetUSData}
          getWorldData={getWorldData}
          setGetWorldData={setGetWorldData}
          getData = {getData}
          region={region}
          usBorderData={usBorderData}
        />
      </div>
      {/* <Countries /> */}
      <div id="top-dash-header">
        <TopDash getData={getData} setgetData={setgetData} />
      </div>
      <div id="right-dash-header">
        <RightDash />
      </div>
      <div id="bottom-dash-header">
        <BottomDash />
      </div>
    </div>
  );
}

export default App;
