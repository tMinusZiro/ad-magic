import LegendItem from "./LegendItem";

const legendItems = [
  new LegendItem(
    "1,000,000 +",
    "#08519c",
    (totalSales) => totalSales >= 1_000_000,
    "white"
  ),
  new LegendItem(
    "500,000 - 999,999",
    "#3182bd",
    (totalSales) => totalSales >= 500_000 && totalSales < 1_000_000,
    "white"
  ),
  new LegendItem(
    "250,000 - 499,999",
    "#6baed6",
    (totalSales) => totalSales >= 250_000 && totalSales < 500_000,
    "white"
  ),
  new LegendItem(
    "125,000 - 249,999",
    "#bdd7e7",
    (totalSales) => totalSales >= 125_000 && totalSales < 250_000,
    "white"
  ),
  new LegendItem(
    "62,000 - 124,999",
    "#eff3ff",
    (totalSales) => totalSales >= 62_000 && totalSales < 125_000,
    "white"
  ),
  new LegendItem(
    "1 - 61,999",
    "#eff3ff",
    (totalSales) => totalSales >= 1 && totalSales < 62_000,
    "white"
  ),
  new LegendItem("0", "#ffffff", (totalSales) => totalSales < 1 || null),
];

export default legendItems;

//     } else {
//       return "08519c";
