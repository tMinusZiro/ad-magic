import React from "react";
import { useState, useEffect } from "react";

export default function TopDash(props) {
  const [data, setdata] = useState(false);
  const [Newdatas, setNewdata] = useState(false);
  const [List, setList] = useState();
  const [TotalSales, setTotalSales] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [itemSold, setitemSold] = useState(0);
  useEffect(() => {
    if (props.getData) {
      fetch("/total-sales/filter")
        .then((res) => res.json())
        .then((totals) => {
          console.log("List ", totals);
          //take this off the loop
          // let ts = Math.ceil(totals.totalSales);
          // ts = ts.toString().split(".");
          // ts[0] = ts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // ts = ts.join(".");

          // setTotalSales(ts);
          console.log("total sales in filter fetch\n", totals.totalSales);
          setTotalSales(totals.totalSales);
          setAveragePrice(Math.ceil(totals.averageSale));
          setitemSold(totals.totalItems);
          setNewdata(false);
          setdata(true);
        });
      console.log("in filter fetch");
    }
  }, [props.getData]);
  if (!data) {
    fetch("/total-sales")
      .then((res) => res.json())
      .then((totals) => {
        console.log("main fetch!!");
        // take this off the loop
        let ts = Math.ceil(totals.totalSales);
        ts = ts.toString().split(".");
        ts[0] = ts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        ts = ts.join(".");

        setTotalSales(ts);

        setAveragePrice(Math.ceil(totals.averageSale));
        setitemSold(totals.totalItems);
        setdata(true);
        setNewdata(true);
      });
  }

  return (
    <section id="top-dash">
      <div id="total-sales" className="dashboard">
        Total Sales
        <span className="top-dash-num">
          {TotalSales} <span className="top-dash-small">$</span>
        </span>
      </div>
      <div id="average-price" className="dashboard">
        Average price
        <span className="top-dash-num">
          {averagePrice} <span className="top-dash-small">$</span>
        </span>
      </div>
      <div id="item-sold" className="dashboard">
        Items Sold
        <span className="top-dash-num">
          {itemSold} <span className="top-dash-small">items</span>
        </span>
      </div>
    </section>
  );
}
