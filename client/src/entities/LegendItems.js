import LegendItem from "./LegendItem";

//each item is a portion of the legend
const legendItems = [
  new LegendItem(
    "50,000 +",
    "#000000",
    (totalSales) => totalSales >= 50_000,
    "white"
  ),
  new LegendItem(
    "25,000 - 49,999",
    "#061B5A",
    (totalSales) => totalSales >= 25_000 && totalSales < 50_000,
    "white"
  ),
  new LegendItem(
    "12,000 - 24,999",
    "#00598F",
    (totalSales) => totalSales >= 12_000 && totalSales < 25_000,
    "white"
  ),
  new LegendItem(
    "6,000 - 11,999",
    "#308FC2",
    (totalSales) => totalSales >= 6_000 && totalSales < 12_000,
    "white"
  ),
  new LegendItem(
    "3,000 - 5,999",
    "#A5BCDC",
    (totalSales) => totalSales >= 3_000 && totalSales < 6_000,
    "white"
  ),
  new LegendItem(
    "1 - 2,999",
    "#ECE7F2",
    (totalSales) => totalSales >= 1 && totalSales < 3_000,
    "white"
  ),
  new LegendItem("0", "#f6eeee", (totalSales) => totalSales < 1 || null),
];

export default legendItems;
