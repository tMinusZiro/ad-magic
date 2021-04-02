import LegendItem from "./LegendItem";

const legendItems = [
  new LegendItem(
    "500,000 +",
    "#084594",
    (totalSales) => totalSales >= 500_000,
    "white"
  ),
  new LegendItem(
    "250,000 - 499,999",
    "#2171b5",
    (totalSales) => totalSales >= 250_000 && totalSales < 500_000,
    "white"
  ),
  new LegendItem(
    "125,000 - 249,999",
    "#4292c6",
    (totalSales) => totalSales >= 125_000 && totalSales < 250_000,
    "white"
  ),
  new LegendItem(
    "62,000 - 124,999",
    "#6baed6",
    (totalSales) => totalSales >= 62_000 && totalSales < 125_000,
    "white"
  ),
  new LegendItem(
    "31,000 - 61,999",
    "#9ecae1",
    (totalSales) => totalSales >= 31_000 && totalSales < 62_000,
    "white"
  ),
  new LegendItem(
    "1 - 30,999",
    "#c6dbef",
    (totalSales) => totalSales >= 1 && totalSales < 31_000,
    "white"
  ),
  new LegendItem("0", "#ffffff", (totalSales) => totalSales < 1 || null),
];

export default legendItems;

//     } else {
//       return "08519c";
