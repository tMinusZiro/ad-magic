import React from "react";

const MapLegend = ({ legendItems, openLegend, setOpenLegend }) => {
  console.log(legendItems);

  function flipMenu() {
    openLegend ? setOpenLegend(!openLegend) : setOpenLegend(openLegend);
  }

  return (
    <div
      id="map-legend-wrapper"
      style={
        openLegend
          ? {
              transform: "translateY(0)",
              display: "flex",
              alignItems: "stretch",
            }
          : {
              transform: "translateY(-100%)",
              display: "flex",
              alignItems: "stretch",
              zIndex: -1,
            }
      }
    >
      {legendItems.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.textColor,
            height: "10vh",
            fontWeight: "bolder",
            fontSize: "1.5em",
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;
