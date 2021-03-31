import React from "react";
import { features } from "../borderData/countries.json";

//sets up class task that will prep the border data
class LoadBorderTask {
  //load method that will accept a state change function
  load = (setState) => {
    //then that state change function will take the destructured features import from the geojson
    setState(features);
  };
}

export default LoadBorderTask;
