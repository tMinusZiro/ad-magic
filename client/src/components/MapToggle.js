// import React from "react";
// import { useState, useEffect} from "react";
// const MapToggle = (props) => {
//   //list of countries in database 
//   const [countriesList, setCountriesList] = useState()
//   const [clientList, setClientList] = useState() 

// <<<<<<< HEAD
//   useEffect ( () => {
//     if (countriesList.length=== 0) {
//       fetch("/countries")
//       .then((res) => res.json())
//       .then((list) => {
//         setCountriesList(list)
//       })
//     }
//     // if (clientList.length === 0) {
//     //   fetch("/clients")
//     //   .then((res) => res.json())
//     //   .then((list) => {
//     //     setClientList(list)
//     //   })
//     // }
//   })
// =======
//   // useEffect ( () => {
//   //   if (countriesList.length=== 0) {
//   //     fetch("/countries")
//   //     .then((res) => res.json())
//   //     .then((list) => {
//   //       setCountriesList(list)
//   //     })
//   //   }
//   //   if (clientList.length === 0) {
//   //     fetch("/clients")
//   //     .then((res) => res.json())
//   //     .then((list) => {
//   //       setClientList(list)
//   //     })
//   //   }
//   // })
// >>>>>>> 909cc8d27a29106910ccea65fa51e32da8b593d7


//   function changeStartDate(event) {
//     props.setStartDate(event.target.value);
//   }

//   function changeEndDate(event) {
//     props.setEndDate(event.target.value);
//   }

//   //change the map to focus in on a particular region
//   function changeRegion(event) {
//     props.setRegion(event.target.value);
//   }
//   //change the client account in order to show data from that client then render the item menu for that client
//   function changeAccount(event) {
//     props.setAccount(event.target.value);
//   }

//   return (
//     <div>
//       <form method="POST" action="/start-date">
//         <label for="start-date">Start Date: </label>
//         <br></br>

//         <input
//           type="date"
//           id="start-date"
//           name="start-date"
//           onChange={changeStartDate}
//         ></input>
//                 <br></br>
//       </form>

//       <br></br>

//         <label for="start-date">End Date: </label>
//         <br></br>
//         <input
//           type="date"
//           id="end-date"
//           name="end-date"
//           onChange={changeEndDate}
//         ></input>
//         <br></br>

//       <br></br>

//       <label for="country">Country: </label>
//         <select name="country" value="Select Country" onChange={changeRegion}>
//           {countriesList ? countriesList.map((obj, index) => {
//             return( )
// </select>
//       <br></br>

//       <form method="POST" action ="/account">
//       <label for="account">Client: </label>
//         <select name="account" value = "select company" onchange={changeAccount}>
//           <option value="People Against Humans">People Against Humans</option>
//           <option value="company-2">Company 2</option>
//           <option value="company-3">Company 3</option>
//           <option value="company-4">Company 4</option>
//           <option value="company-5">Company 5</option>
//           <option value="company-6">Company 6</option>
//           <option value="company-7">Company 7</option>
//           <option value="company-8">Company 8</option>
//         </select>
//         <br></br>
//       </form>
//     </div>
//   );
// };

// export default MapToggle;
