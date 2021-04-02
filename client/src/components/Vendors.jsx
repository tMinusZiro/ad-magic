import ReactApexChart from "react-apexcharts";
import {useState,useEffect} from 'react'



export default function Vendors(props) {
    // const[SaleTypes, setSaleTypes] = useState([])
    const [VendorsList, setVendorsList] = useState([])
    const [VendorsLabels, setVendorsLabels] = useState([])
    const [VendorsAmounts, setVendorsAmounts] = useState([])
    let labels=[];
    let amount=[];
    const [Trigger, setTrigger] = useState(true)

// useEffect(async () => {
//     console.log('in use effect')
    
//         console.log('in trigger')
//       await fetch('/vendors')
//     .then((res) =>res.json())
//     .then((entry)=>{
//         setSaleTypes(entry)
//     })
// }
// , [SaleTypes]
// )
if(Trigger){
   props.SaleTypes.forEach((type) => {
            labels.push(type._id);
            amount.push(type.numberOfSales)
} )
    console.log('Time Out Function')
    setVendorsLabels(labels)
            setVendorsAmounts(amount)

    setTrigger(false)
    }


// 
//     fetch('/vendors')
//     .then((res) =>res.json())
//     .then((entry)=>{
//         props.setSaleTypes(entry)
//     })
//      props.SaleTypes.forEach((type) => {
//             labels.push(type._id);
//             amount.push(type.numberOfSales)
// } )
// triger = true;
// };
console.log('props.SaleTypes',props.SaleTypes)
console.log('Amount',VendorsAmounts)
console.log('labels ',VendorsLabels)

      const series = [20,30];
 
    const options = {
         labels: [1,2],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width:    100,
              height: 100,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    return (
        <div>
           <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width="100%" />
      </div>       
        </div>
    )
}
