import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "./../svg/logo.png"

const MapToggle = (props) => {
  //useHistory to push to correct page on map toggle 
  const history = useHistory();
  //list of all clients in database
  const [clientList, setClientList] = useState();
  //trigger items to load for a specific client
  const [loadItems, setLoadItems] = useState(false);
  //list of all items by a particular client
  const [listOfItems, setListOfItems] = useState();
  //show and hide custom date function
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [checkStatus, setCheckedStatus] = useState();
  const [displayRegions, setDisplayRegions] = useState(false);
  //status of switch checked = US Map, false = world map
  const [USmap, setUSMap] = useState();
  const [account, setAccount] = useState("all");
  const [regionList, setRegionList] = useState([
    "World",
    "Africa",
    "Asia",
    "Australia",
    "Europe",
    "North America",
    "South America",
  ]);

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
          setLoadItems(false);
          setListOfItems(itemArray.sort());
        });
    }
  });

  function showCalendar(event) {
    if (event.target.value === "custom") {
      setShowCustomDate(true);
    } else setShowCustomDate(false);
  }

  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    setAccount(event.target.value);
    setLoadItems(true);
  }

  function reLoad(event) {
    props.setgetData(true);
    if (window.location.pathname === "/") {
      props.setGetWorldData(true)
    } else if (window.location.pathname ==="/united") { 
      props.setGetUSData(true)
    }
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
      props.setRegion("World");
      setUSMap(false);
      setRegionList([
        "World",
        "Africa",
        "Asia",
        "Australia",
        "Europe",
        "North America",
        "South America",
      ]);
      history.push("/");
    } else if (!USmap) {
      setUSMap(true);
      props.setRegion("US");
      setRegionList([
        "US",
        "Northeast",
        "South",
        "Midwest",
        "West",
        "Alaska",
        "Hawaii",
      ]);
      history.push("/united");
    }
  }

  useEffect(() => { 
  if (window.location.pathname === "/united") {
    setCheckedStatus(true)
  } else if(window.location.pathname === "/") {
    setCheckedStatus(false)
  }
}, [window.location.pathname])

  function handleRegionDropdown(event) {
    setDisplayRegions(!displayRegions);
  }

  function changeRegion(event) {
    props.setRegion(event.target.innerHTML);
    setDisplayRegions(!displayRegions);
  }

  return (
    <div id="side-bar">
      <img id = "logo" src={logo} ></img>
      <form method="POST" action="/show-item-sales">
      <div id="map-toggles">
        MAP TOGGLES
        <br></br>
        <div class="switch-container">
          <div class = "switch-title">World</div> 
          <label class="switch" onChange={switchMap}>
            <input type="checkbox" name="US" defaultChecked={checkStatus} />
            <span class="slider round"></span>
          </label><div class = "switch-title">US</div> 
        </div>
        <br></br>
        <div class="dropdown-container">
          <div class="dropdown-title" onClick={handleRegionDropdown}>
            Region: {props.region}
          </div>
          <ul>
            {displayRegions
              ? regionList.map((item, index) => {
                  return <li class = "dropdown-item" onClick ={changeRegion} key={index}>{item}</li>;
                })
              : null}
          </ul>
        </div>
      </div>

      <select name="datePreset" onChange={showCalendar} defaultValue="all-time">
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
          ></input>

          <label for="endDate">End Date: </label>
          <br></br>
          <input
            type="date"
            id="endDate"
            name="endDate"
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
      </form>
    </div>
  );
};

export default MapToggle;
