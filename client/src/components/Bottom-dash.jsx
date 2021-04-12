import { useState, useEffect } from "react";
import SalesType from "./SalesTypes";
import Fullfilment from "./Fullfilment";
import OptInMarketing from "./optInMarketing";

export default function BottomDash() {
  //sale types
  const [SaleTypes, setSaleTypes] = useState([]);
  const [SaleTypesLabels, setSaleTypesLabels] = useState(["item"]);
  const [SaleTypesAmounts, setSaleTypesAmounts] = useState([1]);
  let StLabels = [];
  let StAmount = [];
  const [StTrigger, setStTrigger] = useState(true);

  //fullfilment
  const [FullfilmentType, setFullfilmentType] = useState([]);
  const [FullfilmentLabels, setFullfilmentLabels] = useState(["item"]);
  const [FullfilmentAmounts, setFullfilmentAmounts] = useState([1]);
  let FLabels = [];
  let FAmount = [];
  const [FTrigger, setFTrigger] = useState(true);

  //Marketing
  const [Marketing, setMarketing] = useState([]);
  const [MarketingLabels, setMarketingLabels] = useState(["item"]);
  const [MarketingAmounts, setMarketingAmounts] = useState([1]);
  let MLabels = [];
  let MAmount = [];
  const [MTrigger, setMTrigger] = useState(true);

  //sale type
  useEffect(() => {
    if (StTrigger) {
      fetch("/salesTypes")
        .then((res) => res.json())
        .then((entry) => {
          console.log("inside SF fetch")
          setSaleTypes(entry);
          setStTrigger(false);
        });
        console.log("inside SF fetch")

    }
  }, []);

  if (!StTrigger) {
    SaleTypes.forEach((type) => {
      StLabels.push(type._id);
      StAmount.push(type.numberOfSales);
    });
    setSaleTypesLabels(StLabels);
    setSaleTypesAmounts(StAmount);
    setStTrigger(true);
  }

  //   //Fullfilment type
  useEffect(() => {
    if (FTrigger) {
      fetch("/fullfilment")
        .then((res) => res.json())
        .then((entry) => {
          setFullfilmentType(entry);
          setFTrigger(false);
        });
    }
  }, []);

  if (!FTrigger) {
    FullfilmentType.forEach((type) => {
      FLabels.push(type._id);
      FAmount.push(type.numberOfSales);
    });
    setFullfilmentLabels(FLabels);
    setFullfilmentAmounts(FAmount);
    setFTrigger(true);
  }

  //Opt in Marketing
  useEffect(() => {
    if (MTrigger) {
      fetch("/marketing")
        .then((res) => res.json())
        .then((entry) => {
          setMarketing(entry);
          setMTrigger(false);
        });
    }
  }, []);

  if (!MTrigger) {
    Marketing.forEach((type) => {
      MLabels.push(type._id);
      MAmount.push(type.numberOfSales);
    });
    setMarketingLabels(MLabels);
    setMarketingAmounts(MAmount);
    setMTrigger(true);
  }
  return (
    <div id="bottom-cont">
      <div className="bottom-charts">
        <SalesType
          SaleTypesAmounts={SaleTypesAmounts}
          SaleTypesLabels={SaleTypesLabels}
        />
      </div>
      <div className="bottom-charts">
        <Fullfilment
          FullfilmentAmounts={FullfilmentAmounts}
          FullfilmentLabels={FullfilmentLabels}
        />
      </div>
      <div className="bottom-charts">
        <OptInMarketing
          MarketingLabels={MarketingLabels}
          MarketingAmounts={MarketingAmounts}
        />
      </div>
    </div>
  );
}
