import React from "react";
import { useState } from "react";

export default function Countries() {
  const [list, setList] = useState([]);
  const [eCom, setECom] = useState(0);
  const [globalSales, setGlobalSales] = useState(0);

  if (list.length === 0) {
    fetch("/countries")
      .then((res) => res.json())
      .then((countryName) => {
        setList(countryName);
      });
  }
  class CountryList {
    //method for adding countries
    addCountries() {
      list.forEach((key) => {
        countryList[key] = { totalSales: 0, numberOfOrders: "", eCom: 0 };
      });
    }
    addTotalSales() {
      //looks in the DB get the name
      fetch("/total-sales")
        .then((res) => res.json())
        .then((country) => {
          setGlobalSales(globalSales + country.totalSales);
        });
      // add total sales to countryList.name.totalSale += total sales from countries db
    }
  }

  let countryList = new CountryList();

  countryList.addCountries();
  console.log(countryList);
  console.log(countryList.Australia);

  return (
    <div>
      <h1>Country List!</h1>
    </div>
  );
}

// class countryList {
// }
// const obj = { a: 1, b: 2 };
// const add = { c: 3, d: 4, e: ["x", "y", "z"] };

// Object.entries(add).forEach(([key, value]) => {
//   obj[key] = value;
// });
