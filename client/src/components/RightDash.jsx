import ReactApexChart from "react-apexcharts";
import {useState, useEffect} from 'react'
// import Vendors from './Vendors'



export default function RightDash() {
 const[SaleTypes, setSaleTypes] = useState([])
    
async function vendorsList(){
    console.log('in use effect RIGTH DASH')
    console.log('in trigger RIGHT DASH')
useEffect(() => {
    fetch('/vendors')
    .then((res) =>res.json())
    .then((entry)=>{
        setSaleTypes(entry)
    })
}
, []
)
}

// vendorsList()


    return (
        <div>
       <Vendors SaleTypes={SaleTypes} />
        </div>
    )
}
