import React from "react";
import { useState, useEffect } from "react";

const LoadTotalSalesTask = () => {
  const [totalSalesList, setTotalSalesList] = useState();
  //fetching total sales for map chloropleth
  console.log("total sales should be undefined");
  console.log(totalSalesList);
  useEffect(() => {
    console.log("Outside guard clause");
    if (!totalSalesList.length) {
      fetch("/total-sales")
        .then((res) => res.json())
        .then((list) => {
          console.log("Inside of fetch about to get sales list");
          setTotalSalesList(list);
        });
    }
  });
  return <div>{console.log("i am in the return statement")}</div>;
};

export default LoadTotalSalesTask;
