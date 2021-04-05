import React from "react";
import { useState, useEffect } from "react";
const MapToggle = (props) => {
  //list of all clients in database
  const [clientList, setClientList] = useState();
  //list of all items by a particular client
  const [loadItems, setLoadItems] = useState(false);
  const [listOfItems, setListOfItems] = useState();
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [account, setAccount] = useState("all");
  let clientArray = [];
  useEffect(() => {
    // if there is no clientList, fetch the list of clients from server
    if (!clientList) {
      fetch("/clients")
        .then((res) => res.json())
        .then((list) => {
          list.forEach((obj) => {
            clientArray.push(obj._id);
          });
          setClientList(clientArray.sort());
        });
    }
    //once the client/account is selected, fetch all items from server that are sold by that client/account
    let itemArray = [];
    if (loadItems) {
      fetch(`/items/${account}`)
        .then((res) => res.json())
        .then((list) => {
          list.forEach((array) => {
            itemArray.push(array);
            array.forEach((item) => {
              itemArray.push(item);
            });
          });
          console.log(itemArray);
          setLoadItems(false);
          setListOfItems(itemArray.sort());
        });
    }
  });

  //pre-set date range function

  function showCalendar(event) {
    if (event.target.value === "custom") {
      setShowCustomDate(true);
    } else setShowCustomDate(false);
  }

  //change the map to focus in on a particular region
  function changeRegion(event) {
    props.setRegion(event.target.value);
    // if (event.target.value ==="United States") {
    //   props.setGetData(true)
    // }
  }

  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    setAccount(event.target.value);
    setLoadItems(true);
  }

  function reLoad(event) {
    props.setGetData(true)
  }

  //set default date on form
  let today = new Date();
  let year = today.getFullYear();
  let month;
  //add a 0 if month or day is signle digits
  if (today.getMonth() + 1 < 10) {
    month = "0" + (today.getMonth() + 1);
  } else month = today.getMonth() + 1;
  let day;
  if (today.getDate() < 10) {
    day = "0" + today.getDate();
  } else day = today.getDate();
  //set default end date
  let defaultDate = `${year}-${month}-${day}`;

  return (
    <div>
      <form method = "POST" action="/united-states">
        <input type = "submit" value = "United States" onSubmit={reLoad}/>
      </form>
      {
        //select a region menu
      }
      <form method="POST" action="/show-item-sales">
        <label for="region">Region: </label>
        <select name="region" onChange={changeRegion}>
          <option value="World">View World Sales</option>
          <option value="United States">United States</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Australia">Australia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
        </select>
        <br></br>
        <br></br>
        <label for="date-preset">View By:</label>
        <select name="datePreset" onChange={showCalendar}>
          <option value="all-time">All Time</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="six-months">Past Six Month</option>
          <option value="year">Past Year</option>
          <option value="custom">Custom Timeframe</option>
        </select>

        <br></br>
        <br></br>
        {showCustomDate ? (
          <div>
            <label for="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue="2018-01-01"
              // onChange={changeStartDate}
            ></input>

            <br></br>
            <br></br>

            <label for="endDate">End Date: </label>
            <br></br>
            <input
              type="date"
              id="endDate"
              name="endDate"
              // onChange={changeEndDate}
              defaultValue={defaultDate}
            ></input>
          </div>
        ) : null}

        <br></br>
        <br></br>

        {
          //once the client list has been loaded, create a menu with each client as an option
        }
        {clientList ? (
          <div>
            <label for="account">
              Client:
              <select name="account" onChange={changeAccount}>
                <option value="all">View All Clients</option>
                {clientList.map((client, index) => {
                  return (
                    <option key={index} value={client}>
                      {client}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        ) : null}

        <br></br>

        {
          //once the item list has been loaded, create a menu with each item as an option
        }
        {listOfItems ? (
          <div>
            <label for="item-list">
              Items:
              <select name="item">
                <option value="all-items">View All Items</option>
                {listOfItems.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        ) : null}
        <input type="submit" value="Show Sales!" onClick = {reLoad}/>
        <br></br>
      </form>
    </div>
  );
};

export default MapToggle;
