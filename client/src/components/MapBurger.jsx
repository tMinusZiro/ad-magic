import React from "react";

const MapBurger = (props) => {
  return (
    <section
      className="burger-menu"
      onClick={() => {
        props.setOpenLegend(!props.openLegend);
      }}
    >
      {/*Burger Menu Stack */}

      <div
        id="burger-line-one"
        style={
          props.openLegend
            ? { transform: "rotate(405deg)", background: "black" }
            : { transform: "rotate(0)", background: "black" }
        }
      />
      <div
        id="burger-line-two"
        style={
          props.openLegend
            ? { opacity: 0, transform: "translateX(20px)", background: "black" }
            : {
                opacity: 1,
                transform: "translateX(0)",
                background: "black",
              }
        }
      />
      <div
        id="burger-line-three"
        style={
          props.openLegend
            ? { transform: "rotate(-405deg)", background: "black" }
            : { transform: "rotate(0)", background: "black" }
        }
      />
    </section>
  );
};

export default MapBurger;
