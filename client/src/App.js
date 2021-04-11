import "./style/App.css";
import "./style/Sidebar.css"
import MapToggle from "./components/MapToggle";
import { useState, useEffect } from "react";
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
  const [getMapData, setGetMapData] = useState(true);
  const [usBorderData, setUSBorderData] = useState(features);
  const [getData, setgetData] = useState(false);

  return (
    <div id="app-wrapper">
      <div id="map-toggle-wrapper">
        <MapToggle
          setRegion={setRegion}
          region={region}
          setGetMapData = {setGetMapData}
          setgetData={setgetData}
        />
      </div>
      <div id="top-background-color"></div>
      <section id="container-one" className="snap-child">
        <div id="header-wrapper">
          <Header />
        </div>
        <div id="fake-graph-wrapper">{/* <img src={backgroundGraph} /> */}</div>
        <div id="top-dash-header">
          <TopDash getData={getData} setgetData={setgetData} />
        </div>
        <div id="right-dash-header">
          <RightDash />
        </div>
      </section>
      <section id="container-two" className="snap-child">
      <div id="home-page">
        <HomePage
          setGetMapData = {setGetMapData}
          getMapData = {getMapData}
          region={region}
          usBorderData={usBorderData}
        />
      </div>
      </section>
      <section id="container-three" className="snap-child">
        <div id="bottom-dash-header">
          <BottomDash />
        </div>
      </section>
    </div>
  );
}

export default App;
