import React from "react";
import { useState, useEffect } from "react";
import averageSaleIcon from "./../svg/averagesale.svg";
import revenueIcon from "./../svg/grossrevenue.svg";
import itemsSoldIcon from "./../svg/itemsold.svg";

export default function TopDash(props) {
  const [data, setdata] = useState(false);
  const [TotalSales, setTotalSales] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [itemSold, setitemSold] = useState(0);
  useEffect(() => {
    if (!data) {
      fetch("/total-sales")
        .then((res) => res.json())
        .then((totals) => {
          // take this off the loop
          let ts = Math.ceil(totals.totalSales);
          ts = ts.toString().split(".");
          ts[0] = ts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          ts = ts.join(".");

          setTotalSales(ts);
          setAveragePrice(Math.ceil(totals.averageSale));
          setitemSold(totals.totalItems);
          setdata(true);
        });
    }
  }, []);

  return (
    <section id="top-dash">
      <div className="top-tile-background">
        <div id="total-sales" className="dashboard">
          <div id="top-dash-title">
            <img src={revenueIcon} id="top-dash-icon" alt="revenue" />
            Gross Revenue
          </div>
          <span className="top-dash-num">
            {TotalSales} <span className="top-dash-small">$</span>
          </span>
        </div>
      </div>
      <div className="top-tile-background">
        <div id="average-price" className="dashboard">
          <div id="top-dash-title">
            <img src={averageSaleIcon} id="top-dash-icon" alt="average sales"/>
            Average Sale
          </div>
          <span className="top-dash-num">
            {averagePrice} <span className="top-dash-small">$</span>
          </span>
        </div>
      </div>
      <div className="top-tile-background">
        <div id="item-sold" className="dashboard">
          <div id="top-dash-title">
            <img src={itemsSoldIcon} id="top-dash-icon" alt="item" />
            Items Sold
          </div>
          <span className="top-dash-num">
            {itemSold} <span className="top-dash-small">items</span>
          </span>
        </div>
      </div>
    </section>
  );
}
