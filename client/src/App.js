import "./style/App.css";
import MapToggle from "./components/MapToggle";
import { useState } from "react";
import TotalSales from "./components/TotalSales";
import Countries from "./components/tasks/Countries";
import HomePage from "./components/HomePage.jsx";
import TopDash from "./components/TopDash";
import RightDash from "./components/RightDash";

function App() {
  //set the region that the map should focus on
  const [region, setRegion] = useState("World");

  return (
    <div id="app-wrapper">
      <div id="map-toggle-wrapper">
        <MapToggle setRegion={setRegion} region={region} />
      </div>

      <div id="data-displays-wrapper">
        <DataDisplays />
      </div>
      <div>
        <HomePage />
      </div>

      {/* element to test the fetch  */}
      <Countries />

      <TopDash />

      <RightDash />
    </div>
  );
}

export default App;
