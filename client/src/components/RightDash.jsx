import { useState, useEffect } from "react";
import VendorsTopFive from "./VendorsTopFive";
import VendorsRev from "./VendorsRev";

function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}
export default function RightDash() {
  //sale types
  const [Vendors, setVendors] = useState([]);
  const [VendorsLabels, setVendorsLabels] = useState(["item"]);
  const [VendorsAmounts, setVendorsAmounts] = useState([1]);
  const [VendorsSales, setVendorsSales] = useState([1]);
  const [RevenueLabels, setRevenueLabels] = useState(["item"]);
  const [RevenueAmounts, setRevenueAmounts] = useState([1]);

  let VLabels = [];
  let VAmount = [];
  let VSales = [];
  let RLabels = [];
  let RAmount = [];
  let RSales = [];
  const [VTrigger, setVTrigger] = useState(true);

  //sale type
  useEffect(() => {
    if (VTrigger) {
      fetch("/vendors")
        .then((res) => res.json())
        .then((entry) => {
          console.log("entry: ", entry);
          setVendors(entry);
          setVTrigger(false);
        });
    }
  }, []);

  if (!VTrigger) {
    //total sales chart
    Vendors[0].forEach((type) => {
      console.log("TYpe : ", type);
      if (VLabels.length < 5 && type._id !== "Breaking Games") {
        VLabels.push(type._id);
        let amount = type.numberOfSales;
        VAmount.push(amount);
        let sales = type.totalSales;
        VSales.push(numFormatter(sales));
      }
    });
    setVendorsLabels(VLabels);
    setVendorsAmounts(VAmount);
    setVendorsSales(VSales);
    // total revenue chart
    Vendors[1].forEach((type) => {
      console.log("TYpe : ", type);
      if (RLabels.length < 5) {
        RLabels.push(type._id);
        let amount = type.totalSales;
        RAmount.push(numFormatter(amount));
      }
      console.log("Rev amount :", RAmount);
      // let sales = type.totalSales;
      // RSales.push(numFormatter(sales));
    });
    setRevenueLabels(RLabels);
    setRevenueAmounts(RAmount);

    setVTrigger(true);
  }
  return (
    <div id="v-and-r-flexWrap">
      <div className="right-charts">
        <VendorsTopFive
          VendorsLabels={VendorsLabels}
          VendorsAmounts={VendorsAmounts}
        />
      </div>
      <div className="right-charts">
        <VendorsRev
          RevenueLabels={RevenueLabels}
          RevenueAmounts={RevenueAmounts}
        />
      </div>
    </div>
  );
}
