import React from "react";
import { useState, useEffect } from "react";
import ClientPopUp from "./ClientPopUp";
const MapLegend = ({ legendItems }) => {
  /*-----STATE HOOKS--------*/
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [clientListInRange, setClientListInRange] = useState();
  const [showClients, setShowClients] = useState(false);
  //-------------------

  //useEffect hook that will trigger a fetch for data every time the min or max change
  //this data is a list of all items that fit within the min-max range
  //the range is determined based on what colored square the user clicks on for the map legend
  useEffect(() => {
    fetch(`/client/${min}/${max}`)
      .then((res) => res.json())
      .then((list) => {
        setClientListInRange(list);
      });
  }, [min, max]);

  //function that sets the state of min and max based on what square the user clicks on
  //conditional helps branch the different scenarios
  function getClients(event) {
    let itemRange = event.target.value;

    if (itemRange === "0") {
      setMin(0);
      setMax(0);
    } else if (itemRange.includes("+")) {
      itemRange = itemRange.split(" ");
      itemRange = itemRange[0];
      itemRange = itemRange.replace(",", "");
      setMin(parseInt(itemRange));
      setMax(100000000000);
    } else {
      itemRange = itemRange.split(" - ");
      setMin(parseInt(itemRange[0].replace(",", "")));
      setMax(parseInt(itemRange[1].replace(",", "")));
    }
    setShowClients(true);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <div
        id="map-legend-wrapper"
        style={{
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* iterate through an array of class instances that contain the information for building each colored square in the map legend -> style added on each iteration */}
        {legendItems.map((item, index) => (
          <button
            id="legend-button"
            onClick={getClients}
            key={index}
            value={item.title}
            name={item.title}
            style={{
              backgroundColor: item.color,
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: item.textColor,
              height: "6vh",
              border: "none",
              // fontWeight: "bolder",
              fontSize: "1.2em",
              borderBottomLeftRadius: item.borderBottomLeftRadius,
              borderBottomRightRadius: item.borderBottomRightRadius
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      {/*ternary for showing a modal when user clicks on map legend square*/}
      {showClients && clientListInRange ? (
        <ClientPopUp
          min={min}
          max={max}
          clientListInRange={clientListInRange}
          setShowClients={setShowClients}
          showClients={showClients}
          style={{ zIndex: 1000 }}
        />
      ) : null}
    </div>
  );
};

export default MapLegend;
