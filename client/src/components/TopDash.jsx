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
    console.log("getData outside:  ", props.getData);
    console.log("in use effect");
  }, []);

  return (
    <section id="top-dash">
      <div className="top-tile-background">
        <div id="total-sales" className="dashboard">
          <span className={"top-dash-logo"}>Total Sales</span>
          <span className="top-dash-num">
            {TotalSales} <span className="top-dash-small">$</span>
          </span>
        </div>
      </div>
      <div className="top-tile-background">
        <div id="average-price" className="dashboard">
          <span className={"top-dash-logo"}>Average price</span>
          <span className="top-dash-num">
            {averagePrice} <span className="top-dash-small">$</span>
          </span>
        </div>
      </div>
      <div className="top-tile-background">
        <div id="item-sold" className="dashboard">
          <span className={"top-dash-logo"}>Items Sold</span>
          <span className="top-dash-num">
            {itemSold} <span className="top-dash-small">items</span>
          </span>
        </div>
      </div>
    </section>
  );
}
