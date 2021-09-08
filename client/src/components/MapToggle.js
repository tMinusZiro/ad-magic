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
import userPic from "../svg/userphoto1.png";

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
  //status of switch checked = US Map, false = world map
  const [USmap, setUSMap] = useState(false);
  //store
  const [account, setAccount] = useState("All Clients");
  //regions change based on current map
  const [regionList, setRegionList] = useState([
    "World",
    "Africa",
    "Asia",
    "Australia",
    "Europe",
    "North America",
    "South America",
  ]);
  //show/hide the region dropdown
  const [displayRegions, setDisplayRegions] = useState(false);
  //get the form results on page load to save in dropdowns
  const [getFormRes, setGetFormRes] = useState(true);
  //set a default date preset - "All time" or user chosen preset
  const [defaultDatePreset, setDefaultDatePreset] = useState("All Time");
  //set a default account - "All Accounts" or user chosen preset
  const [defaultAccount, setDefaultAccount] = useState();
  //set a default item - "All Items" or user chosen items
  const [defaultItem, setDefaultItem] = useState();
  //set default date title - make it "Timeframe" if user has not input data
  const [presetDateTitle, setPresetDateTitle] = useState("Time");
  //set default account title - make it "Clients" if user has not input data
  const [presetAccountTitle, setPresetAccountTitle] = useState("Account");
  //set default account title - make it "Items" if user has not input data
  const [presetItemName, setPresetItemName] = useState("Item");

  //set default date on form for custom date
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

  //use above code to input a default end date for the function
  const [defaultEndDate, setDefaultEndDate] = useState(
    `${year}-${month}-${day}`
  );
  //make default start date early 2018
  const [defaultStartDate, setDefaultStartDate] = useState("2018-01-01");

  //create an array of clients
  let clientArray = [];
  useEffect(() => {
    // if there is no clientList, fetch the list of clients from server
    if (!clientList) {
      fetch("/clients")
        .then((res) => res.json())
        .then(
          (list) => {
            list.forEach((obj) => {
              clientArray.push(obj._id);
            });
            //order clients, make all acounts default, trigger item list to load
            setClientList(clientArray.sort());
            setAccount("All Clients");
            setLoadItems(true);
          },
          [clientList]
        );
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
    //we lose form results on the refresh
    if (getFormRes) {
      fetch("/formresults")
        .then((res) => res.json())
        .then((results) => {
          setDefaultDatePreset(results.datePreset);
          setDefaultAccount(results.account);
          setDefaultItem(results.item);
          if (results.presetDateName) {
            setPresetDateTitle(results.datePreset);
            setPresetAccountTitle(results.presetClientName);
            setPresetItemName(results.presetItem);
          } else {
            setPresetDateTitle(results.datePreset);
            setPresetAccountTitle(results.account);
            setPresetItemName(results.item);
          }
          if (results.startDate && results.endDate) {
            setDefaultEndDate(results.endDate);
            setDefaultStartDate(results.startDate);
            setShowCustomDate(true);
          }
        });
      setGetFormRes(false);
    }
  });

  //display calendars for user to choose custom date
  function showCalendar(event) {
    if (event.target.value === "Custom") {
      setShowCustomDate(true);
    } else setShowCustomDate(false);
  }

  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    setAccount(event.target.value);
    setLoadItems(true);
    setDefaultItem("All Items");
  }

  //trigger the map and data displays to re-load with new data based on user input
  function reLoad(event) {
    props.setgetData(true);
    props.setGetUSMapData(true);
    props.setGetWorldMapData(true);
  }

  //send chosen region to App -> Home -> Map to adjust zoom
  function changeRegion(event) {
    props.setRegion(event.target.innerHTML);
  }

  //show all regions when the user clicks on the region dropdown
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
      <div id="side-bar-component">
        <img id="logo" src={logo} alt="Ad Magic Logo"></img>
        <div id="sidebar-title">Executive Financial Dashboard</div>
        {/* <div className="section-title">USER</div> */}
        <div id="user-wrapper">
          <img src={userPic} alt="user" />
          <div className="section-title">PATRICIA SMITH</div>
        </div>

        <form method="POST" action="/show-item-sales">
          <div className="section-title">MAIN</div>
          <div className="select-title">
            <img id="icon" src={calendar} alt="calendar"></img>
            <select
              name="datePreset"
              onChange={showCalendar}
              defaultValue={defaultDatePreset}
            >
              <option value={defaultDatePreset}>{presetDateTitle}</option>
              <option value="All time">All Time</option>
              <option value="Past Week">Past Week</option>
              <option value="Past Month">Past Month</option>
              <option value="Last quarter">Last Quarter</option>
              <option value="Past Six Months">Past Six Months</option>
              <option value="Past Year">Past Year</option>
              <option value="Custom">Custom Timeframe</option>
            </select>
          </div>

          {showCustomDate ? (
            <div>
              <label id="date-label" for="startDate">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                defaultValue={defaultStartDate}
              ></input>
              <label id="date-label" for="endDate">
                End Date:
              </label>
              <br></br>
              <input
                type="date"
                id="endDate"
                name="endDate"
                defaultValue={defaultEndDate}
              ></input>
            </div>
          ) : null}

          {clientList ? (
            <div className="select-title">
              <img id="icon" src={item} alt="item" />
              <select
                name="account"
                defaultValue={defaultAccount}
                onChange={changeAccount}
              >
                <option value={defaultAccount}>{presetAccountTitle}</option>
                <option value="All Clients">All Clients</option>
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
              <img id="icon" src={client} alt="client" />
              <select name="item" defaultValue={defaultItem}>
                <option value={defaultItem}>{presetItemName}</option>
                <option value="All Items">All Items</option>
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

        <div className="section-title">MAP VIEW</div>
        <div className="switch-container">
          <img id="world-icon" src={location} alt="world" />
          <div className="switch-title">World</div>

          <label className="switch" onChange={switchMap}>
            <input type="checkbox" name="US" />
            <span className="slider round"></span>
          </label>
          <div id = "USTitle" className="switch-title">U.S.</div>
        </div>
        <div className="dropdown-container">
          <img src={region} id="region-icon" alt="region" />
          <div className="dropdown-title" onClick={showRegions}>
            Region
            <div id="icon-container">
              <img
                src={dropdown}
                id="dropdown-icon"
                alt="downwards arrow"
                onClick={showRegions}
              />
            </div>
          </div>
        </div>
      </div>
      {displayRegions ? (
        <ul>
          {regionList.map((item, index) => {
            return (
              <li
                id="region-item"
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
                className="dropdown-item"
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
