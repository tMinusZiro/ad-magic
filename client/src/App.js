import "./style/App.css";
import MapToggle from "./components/MapToggle";
import DataDisplays from "./components/DataDisplays";
import { useState } from "react";
import TotalSales from "./components/TotalSales";
import Countries from "./components/tasks/Countries";

function App() {
  //set the region that the map should focus on
  const [region, setRegion] = useState("World");

  return (
    <div id="app-wrapper">
      <div id="map-toggle-wrapper">
        <MapToggle
          setRegion={setRegion}
          region = {region}
        />
      </div>
      <div id="map-wrapper">
        <TotalSales
          region={region}
        />
      </div>
      <div id="data-displays-wrapper">
        <DataDisplays />
      </div>
      {/* element to test the fetch  */}
      <Countries />
    </div>
  );
}

export default App;
