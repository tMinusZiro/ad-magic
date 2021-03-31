import React from "react";
import { useEffect } from "react";

const LoadTotalSalesTask = (props) => {
  //fetches total sales for each country
  //sets the total sale state with an array of country objects
  useEffect(() => {
    console.log("Outside guard clause");
    if (!props.totalSales) {
      fetch("/total-sales")
        .then((res) => res.json())
        .then((list) => {
          console.log("Inside fetch at total sales task");
          props.setTotalSales(list);
        });
    }
  });

  console.log("inside total sales task component = " + props.totalSales);
  return <div></div>;
};

export default LoadTotalSalesTask;
