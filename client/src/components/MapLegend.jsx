import React from "react";
import { useState, useEffect } from "react";
import ClientPopUp from "./ClientPopUp";
const MapLegend = ({ legendItems}) => {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [clientListInRange, setClientListInRange] = useState();
  const [showClients, setShowClients] = useState(false);

  useEffect(() => {
    fetch(`/client/${min}/${max}`)
      .then((res) => res.json())
      .then((list) => {
        setClientListInRange(list);
      });
  }, [min, max]);

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
        style={ {
                display: "flex",
                alignItems: "stretch",
              }
        }
      >
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
              height: "5vh",
              border: "none",
              // fontWeight: "bolder",
              fontSize: "1.2em",
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
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
