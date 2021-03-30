import "./style/App.css";
import MapToggle from "./components/MapToggle";
import Map from "./components/Map";
import DataDisplays from "./components/DataDisplays";
import { useState } from "react";
import TotalSales from "./components/TotalSales";
import Countries from "./components/tasks/Countries";

function App() {
  //set the start date
  const [startDate, setStartDate] = useState("all");
  //set the end date
  const [endDate, setEndDate] = useState("all");
  //set the region that the map should focus on
  const [region, setRegion] = useState("all");
  //set the client that we would like to show data for:
  const [account, setAccount] = useState("all");
  console.log(startDate, endDate, region, account);

  return (
    <div id="app-wrapper">
      {/* <div id="map-toggle-wrapper">
        <MapToggle
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setRegion={setRegion}
        />
      </div> */}
      {/* <div id="map-wrapper">
        <TotalSales />
      </div>
      <div id="data-displays-wrapper">
        <DataDisplays />
      </div> */}
      <Countries />
    </div>
  );
}

export default App;
