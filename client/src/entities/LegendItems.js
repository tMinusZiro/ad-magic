import LegendItem from "./LegendItem";

//each item is a portion of the legend
const legendItems = [
new LegendItem(
  "50,000 +",
  "#08330E",
  (totalSales) => totalSales >= 50_000,
  "white"
),
new LegendItem(
  "25,000 - 49,999",
  "#305532",
  (totalSales) => totalSales >= 25_000 && totalSales < 50_000,
  "white"
),
new LegendItem(
  "12,000 - 24,999",
  "#4F7454",
  (totalSales) => totalSales >= 12_000 && totalSales < 25_000,
  "white"
),
new LegendItem(
  "6,000 - 11,999",
  "#6F9473",
  (totalSales) => totalSales >= 6_000 && totalSales < 12_000,
  "white"
),
new LegendItem(
  "3,000 - 5,999",
  "#97BB9D",
  (totalSales) => totalSales >= 3_000 && totalSales < 6_000,
  "white"
),
new LegendItem(
  "1 - 2,999",
  "#C6E9CC",
  (totalSales) => totalSales >= 1 && totalSales < 3_000,
  "white"
),
new LegendItem("0", "white", (totalSales) => totalSales < 1 || null),
];

export default legendItems;
