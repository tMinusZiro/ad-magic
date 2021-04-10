import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "./../svg/logo.svg";
import calendar from "./../svg/calendar.svg";
import client from "./../svg/client.svg";
import item from "./../svg/item.svg";
import location from "./../svg/location.svg";
import region from "./../svg/Region.svg";
import dropdown from "./../svg/dropdown.svg";

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
  //status of switch checked = US Map, false = world map
  const [USmap, setUSMap] = useState(false);
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
  const [displayRegions, setDisplayRegions] = useState(false);

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
          //order clients, make all acounts default, trigger item list to load
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

  //display calendars for user to choose custom date
  function showCalendar(event) {
    if (event.target.value === "custom") {
      setShowCustomDate(true);
    } else setShowCustomDate(false);
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

  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    setAccount(event.target.value);
    setLoadItems(true);
  }

  //trigger the map and data displays to re-load with new data based on user input
  function reLoad(event) {
    props.setgetData(true);
    if (window.location.pathname === "/") {
      props.setGetWorldData(true);
    } else if (window.location.pathname === "/united") {
      props.setGetUSData(true);
    }
  }

  //on the re-load, make sure that the switch is ON if re-loading to /united, make sure it it set to off it world map
  useEffect(() => {
    if (window.location.pathname === "/united") {
      setCheckedStatus(true);
    } else if (window.location.pathname === "/") {
      setCheckedStatus(false);
    }
  }, [window.location.pathname]);

  function changeRegion(event) {
    props.setRegion(event.target.innerHTML);
  }

  function showRegions(event) {
    setDisplayRegions(!displayRegions);
  }
  //change the map view between US and World Map
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
        "United States",
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

  return (
    <div id="side-bar">
      <img id="logo" src={logo}></img>
      <form method="POST" action="/show-item-sales">
        <div class="section-title">MAIN</div>
        <div className="select-title">
          <img id="icon" src={calendar}></img>
          <select
            name="datePreset"
            onChange={showCalendar}
            defaultValue="all-time"
          >
            <option value="all-time">Timeframe</option>
            <option value="all-time">All Time</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="six-months">Past Six Months</option>
            <option value="year">Past Year</option>
            <option value="custom">Custom Timeframe</option>
          </select>
        </div>
        {showCustomDate ? (
          <div>
            <label id="date-label" for="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue="2018-01-01"
            ></input>

            <label id="date-label" for="endDate">End Date: </label>
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
          <div className="select-title">
            <img id="icon" src={item} />
            <select name="account" defaultValue="all" onChange={changeAccount}>
              <option value="all">Client</option>
              <option value="all">All Clients</option>
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
          <div className="select-title">
            <img id="icon" src={client} />
            <select name="item" defaultValue="all-items">
              <option value="all-items">Item</option>
              <option value="all-items">All Items</option>
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
        <div id="button-container">
          <input
            id="update-button"
            type="submit"
            value="UPDATE"
            onClick={reLoad}
          />
        </div>
      </form>

      <div class="section-title">MAP VIEW</div>
      <div class="switch-container">
        <img id="world-icon" src={location} />
        <div class="switch-title">World</div>

        <label class="switch" onChange={switchMap}>
          <input type="checkbox" name="US" defaultChecked={checkStatus} />
          <span class="slider round"></span>
        </label>
        <div class="switch-title">United States</div>
      </div>
      <div class="dropdown-container">
        <img src={region} id="region-icon" />
        <div class="dropdown-title" onClick={showRegions}>
          Region
        </div>
        <div id="icon-container">
          <img src={dropdown} id="dropdown-icon" onClick={showRegions}/>
        </div>
      </div>
      {displayRegions ? (
        <ul>
          {regionList.map((item, index) => {
            return (
              <li
                value={item}
                style={
                  item === props.region
                    ? {
                        backgroundColor: "#a3afc5",
                        color: "#33475B",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }
                    : null
                }
                class="dropdown-item"
                onClick={changeRegion}
                key={index}
              >
                {item}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default MapToggle;
