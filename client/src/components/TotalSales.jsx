import React from 'react'
import Map from "./Map"
import {useState, useEffect} from 'react'
const TotalSales = (props) => {
    const [data, setData] = useState()
    const [subsetData, setSubsetData] = useState() 

    useEffect(() => {
        if (!data) {
            fetch("/all-sales")
            .then((res) => res.json())
            .then((list) => {
                setData(list)
            })
        }
    })


    // if (data) {console.log(data[0])
    // let newArray = [] 
    // for (const object in data) {
    //     console.log(object.Transaction_date_c)
    //     if (object.Transaction_date__c.getFullYear() >= props.startDate.getFullYear() && object.Transaction_date__c.getFullYear() <= props.startDate.getFullYear()) {
    //         newArray.push(object) 
    //     }
    //     setSubsetData(newArray)
    // }




    return (
        <div>
            <Map startDate={props.startDate}
          endDate={props.endDate}
          region={props.region}
          account={props.account}
          item={props.item} ></Map>
        </div>
    )
}

export default TotalSales
