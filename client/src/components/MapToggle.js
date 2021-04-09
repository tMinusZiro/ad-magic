import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

const MapToggle = (props) => {
  //list of all clients in database
  const [clientList, setClientList] = useState();
  //trigger items to load for a specific client
  const [loadItems, setLoadItems] = useState(false);
  //list of all items by a particular client
  const [listOfItems, setListOfItems] = useState();
  //show and hide custom date function
  const [showCustomDate, setShowCustomDate] = useState(false);
  //user chosen account
  const [account, setAccount] = useState("all");
  //status of switch checked = US Map, false = world map
  const history = useHistory();
  const [checkStatus, setCheckedStatus] = useState();
  const [USmap, setUSMap] = useState(false);

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
          setAccount("all");
          setLoadItems(true);
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
  }

  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    setAccount(event.target.value);
    setLoadItems(true);
  }

  function reLoad(event) {
    props.setgetData(true);
    props.setGetWorldData(true);
    console.log("reload function");
    // if (USmap) {
    // props.setGetUSData(true);
    // } else
    props.setGetWorldData(true);
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

  function switchMap(event) {
    if (USmap) {
      setUSMap(false);
      history.push("/");
    } else if (!USmap) {
      console.log(props.map);
      setUSMap(true);
      history.push("/united");
    }
  }

  // useEffect(() => {
  //   if (window.location.pathname === "/united") {
  //     setCheckedStatus("true");
  //   } else if (window.location.pathname === "/") {
  //     setCheckedStatus("false");
  //   }
  // }, [window.location.pathname]);

  return (
    <div id="side-bar">
      <form method="POST" action="/show-item-sales">
        <div class="switch-container">
          <label class="switch" onChange={switchMap}>
            <input type="checkbox" name="US" defaultChecked={checkStatus} />
            <span class="slider round"></span>
          </label>
        </div>
        <br></br>
        {!USmap ? (
          <button class="dropdown-btn">
            <select name="region" onChange={changeRegion}>
              <option>Region</option>
              <option value="World">View World Sales</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
            </select>
          </button>
        ) : (
          <select name="region" onChange={changeRegion}>
            <option>Region</option>
            <option value="US">United States</option>
            <option value="Northeast">Northeast</option>
            <option value="South">South</option>
            <option value="Midwest">Midwest</option>
            <option value="West">West</option>
            <option value="Alaska">Alaska</option>
            <option value="Hawaii">Hawaii</option>
          </select>
        )}
        <select
          name="datePreset"
          onChange={showCalendar}
          defaultValue="all-time"
        >
          <option>View By:</option>
          <option value="all-time">All Time</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="six-months">Past Six Months</option>
          <option value="year">Past Year</option>
          <option value="custom">Custom Timeframe</option>
        </select>
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
        {clientList ? (
          <div>
            <select name="account" defaultValue="all" onChange={changeAccount}>
              <option>Client</option>
              <option value="all">View All Clients</option>
              {clientList.map((client, index) => {
                return (
                  <option key={index} value={client}>
                    {client}
                  </option>
                );
              })}
            </select>
          </div>
        ) : null}
        {listOfItems ? (
          <div>
            <select name="item" defaultValue="all-items">
              <option value="all-items">View All Items</option>
              {listOfItems.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        ) : null}
        <input type="submit" value="Show Sales!" onClick={reLoad} />
        <br></br>
      </form>
      <Link to="/loading-map">
        <button>Push Me</button>
      </Link>
    </div>
  );
};

export default MapToggle;
