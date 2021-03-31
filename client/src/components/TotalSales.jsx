import React from "react";
import Map from "./Map";
import { useState, useEffect } from "react";
const TotalSales = (props) => {
  const [data, setData] = useState();
  const [subsetData, setSubsetData] = useState();

  //object kay/value country/total sales
  const [totalSales, setTotalSales] = useState();

  useEffect(() => {
    if (!data) {
      fetch("/all-sales")
        .then((res) => res.json())
        .then((list) => {
          setData(list);
        });
    }
  });

  //fetching total sales for map chloropleth
  useEffect(() => {
    console.log("Outside guard clause");
    if (!totalSales) {
      fetch("/total-sales")
        .then((res) => res.json())
        .then((list) => {
          setTotalSales(list);
        });
    }
  });

  // function testTotalSalesList() {
  //   if (interTotalSales) {
  //     return interTotalSales.forEach((country) => {
  //       let countryName = country._id;
  //       let totalSales = country.totalSales;
  //       setTotalSales({
  //         countryName: totalSales,
  //       });
  //     });
  //   } else {
  //     return "Loading";
  //   }
  // }
  // testTotalSalesList();

  // if (data) {console.log(data[0])
  // let newArray = []
  // for (const object in data) {
  //     console.log(object.Transaction_date_c)
  //     if (object.Transaction_date__c.getFullYear() >= props.startDate.getFullYear() && object.Transaction_date__c.getFullYear() <= props.startDate.getFullYear()) {
  //         newArray.push(object)
  //     }
  //     setSubsetData(newArray)
  // }

  return (
    <div>
      <Map
        totalSales={totalSales}
        startDate={props.startDate}
        endDate={props.endDate}
        region={props.region}
        account={props.account}
        item={props.item}
      ></Map>
    </div>
  );
};

export default TotalSales;
