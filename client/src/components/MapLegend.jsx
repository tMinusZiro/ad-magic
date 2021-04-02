import React from "react";

const MapLegend = ({ legendItems }) => {
  console.log(legendItems);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
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
