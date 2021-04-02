import LegendItem from "./LegendItem";

//each item is a portion of the legend 
const legendItems = [
  new LegendItem(
    "500,000 +",
    "#7a0177",
    (totalSales) => totalSales >= 50_000,
    "white"
  ),
  new LegendItem(
    "25,000 - 49,999",
    "#ae017e",
    (totalSales) => totalSales >= 25_000 && totalSales < 50_000,
    "white"
  ),
  new LegendItem(
    "12,000 - 24,999",
    "#dd3497",
    (totalSales) => totalSales >= 12_000 && totalSales < 25_000,
    "white"
  ),
  new LegendItem(
    "6,000 - 11,999",
    "#f768a1",
    (totalSales) => totalSales >= 6_000 && totalSales < 12_000,
    "white"
  ),
  new LegendItem(
    "3,000 - 5,999",
    "#fa9fb5",
    (totalSales) => totalSales >= 3_000 && totalSales < 6_000,
    "white"
  ),
  new LegendItem(
    "1 - 2,999",
    "#fcc5c0",
    (totalSales) => totalSales >= 1 && totalSales < 3_000,
    "white"
  ),
  new LegendItem("0", "#ffffff", (totalSales) => totalSales < 1 || null),
];

export default legendItems;

//     } else {
//       return "08519c";
