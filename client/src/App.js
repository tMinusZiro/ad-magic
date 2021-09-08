import "./style/App.css";
import "./style/Sidebar.css";
import MapToggle from "./components/MapToggle";
import { useState } from "react";
import HomePage from "./components/HomePage.jsx";
import TopDash from "./components/TopDash";
import RightDash from "./components/RightDash";
import BottomDash from "./components/Bottom-dash";
import Footer from "./components/footer.jsx";
import AreaGraph from "./components/AreaGraph";
import { features } from "./borderData/usBorder.json";

function App() {
  //set the region that the map should focus on
  const [region, setRegion] = useState();
  //trigger the data to re-fetch when form is submitted
  const [getUSMapData, setGetUSMapData] = useState(true);
  const [getWorldMapData, setGetWorldMapData] = useState(true);
  const usBorderData = features;
  const [getData, setgetData] = useState(false);

  return (
    <div id="app-wrapper">
      <div id="map-toggle-wrapper">
        <MapToggle
          setRegion={setRegion}
          region={region}
          setGetUSMapData={setGetUSMapData}
          setGetWorldMapData={setGetWorldMapData}
          setgetData={setgetData}
        />
      </div>

      <section id="container-one" className="snap-child">
        <div id="area-graph-comp-wrap">
          <AreaGraph />
        </div>
        <div id="top-dash-header">
          <TopDash getData={getData} setgetData={setgetData} />
        </div>
        <div id="right-dash-header">
          <RightDash />
        </div>
              {/* 
      </section>
              */}

      <section id="container-two" className="snap-child">
        <div id="home-page">
          <HomePage
            setGetUSMapData={setGetUSMapData}
            setGetWorldMapData={setGetWorldMapData}
            getUSMapData={getUSMapData}
            getWorldMapData={getWorldMapData}
            region={region}
            usBorderData={usBorderData}
          />
        </div>
      </section>

              {/*
      <section id="container-three" className="snap-child">
        <div id="bottom-dash-header">
          <BottomDash />
        </div>
        <Footer /> */}
      </section>
    </div>
  );
}

export default App;
