import LegendItem from "./LegendItem";

//each item is a portion of the legend
const legendItems = [
//   new LegendItem(
//     "50,000 +",
//     "#000000",
//     (totalSales) => totalSales >= 50_000,
//     "white"
//   ),
//   new LegendItem(
//     "25,000 - 49,999",
//     "#061B5A",
//     (totalSales) => totalSales >= 25_000 && totalSales < 50_000,
//     "white"
//   ),
//   new LegendItem(
//     "12,000 - 24,999",
//     "#00598F",
//     (totalSales) => totalSales >= 12_000 && totalSales < 25_000,
//     "white"
//   ),
//   new LegendItem(
//     "6,000 - 11,999",
//     "#308FC2",
//     (totalSales) => totalSales >= 6_000 && totalSales < 12_000,
//     "white"
//   ),
//   new LegendItem(
//     "3,000 - 5,999",
//     "#A5BCDC",
//     (totalSales) => totalSales >= 3_000 && totalSales < 6_000,
//     "white"
//   ),
//   new LegendItem(
//     "1 - 2,999",
//     "#ECE7F2",
//     (totalSales) => totalSales >= 1 && totalSales < 3_000,
//     "white"
//   ),
//   new LegendItem("0", "#f6eeee", (totalSales) => totalSales < 1 || null),
// ];


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

// new LegendItem(
//   "50,000 +",
//   "#F75808",
//   (totalSales) => totalSales >= 50_000,
//   "#33475b"
// ),
// new LegendItem(
//   "25,000 - 49,999",
//   "#FF8547",
//   (totalSales) => totalSales >= 25_000 && totalSales < 50_000,
//   "#33475b"
// ),
// new LegendItem(
//   "12,000 - 24,999",
//   "#FFAD85",
//   (totalSales) => totalSales >= 12_000 && totalSales < 25_000,
//   "#33475b"
// ),
// new LegendItem(
//   "6,000 - 11,999",
//   "#FFD68F",
//   (totalSales) => totalSales >= 6_000 && totalSales < 12_000,
//   "#33475b"
// ),
// new LegendItem(
//   "3,000 - 5,999",
//   "#FCE0B0",
//   (totalSales) => totalSales >= 3_000 && totalSales < 6_000,
//   "#33475b"
// ),
// new LegendItem(
//   "1 - 2,999",
//   "#FCEDD4",
//   (totalSales) => totalSales >= 1 && totalSales < 3_000,
//   "#33475b"
// ),
// new LegendItem("0", "#fff1eb", (totalSales) => totalSales < 1 || null, "#33475b"),

// ];

export default legendItems;
