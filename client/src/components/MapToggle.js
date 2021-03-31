import React from "react";
import { useState, useEffect } from "react";
const MapToggle = (props) => {
  //list of all clients in database
  const [clientList, setClientList] = useState();
  //list of all items by a particular client
  const [loadItems, setLoadItems] = useState(false);
  const [listOfItems, setListOfItems] = useState();

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
      fetch(`/items/${props.account}`)
        .then((res) => res.json())
        .then((list) => {
          console.log("list", list);
          list.forEach((array) => {
            console.log("array:", array);
            itemArray.push(array);
            array.forEach((item) => {
              itemArray.push(item);
            });
          });
          setLoadItems(false);
          setListOfItems(itemArray);
        });
    }
  });

  //choose your own start date function
  function changeStartDate(event) {
    props.setStartDate(event.target.value);
  }

  //chose your own end date function
  function changeEndDate(event) {
    props.setEndDate(event.target.value);
  }

  //pre-set date range function

  function changeDateRange(event) {
    //if client chooses last year, subtract 1 from current year
    if (event.target.value === "year") {
      let newStart = new Date();
      let year = newStart.getFullYear();
      newStart.setFullYear(year - 1);
      props.setStartDate(newStart);
      //if client chooses last 6 months, subtract 6 months from months
    } else if (event.target.value === "six-months") {
      let newStart = new Date();
      let month = newStart.getMonth();
      newStart.setMonth(month - 6);
      props.setStartDate(newStart);
      //if client chooses last month, subtract 1 month from months
    } else if (event.target.value === "month") {
      let newStart = new Date();
      let month = newStart.getMonth();
      newStart.setMonth(month - 1);
      props.setStartDate(newStart);
      //if client chooses last week, subtract 7 days from date
    } else if (event.target.value === "week") {
      let newStart = new Date();
      let date = newStart.getDate();
      newStart.setDate(date - 7);
      props.setStartDate(newStart);
      //client chooses quarter
    } else if (event.target.value === "quarter") {
      let newStart = new Date();
      let month = newStart.getMonth();
      //if it's Jan, Feb, or March, set the quarter to be the last three months of the previous year
      if (month === 0 || month === 1 || month === 2) {
        let year = newStart.getFullYear() - 1;
        let startMonth = 10;
        let endMonth = 12;
        let startDate = 1;
        let endDate = 31;
        props.setStartDate(new Date(`${year}-${startMonth}-${startDate}`));
        props.setEndDate(new Date(`${year}-${endMonth}-${endDate}`));
        //if it's April, May or June, set the quarter to be January - March of current year
      } else if (month === 3 || month === 4 || month === 5) {
        let year = newStart.getFullYear();
        let startMonth = 1;
        let endMonth = 3;
        let startDate = 1;
        let endDate = 31;
        props.setStartDate(new Date(`${year}-${startMonth}-${startDate}`));
        props.setEndDate(new Date(`${year}-${endMonth}-${endDate}`));
        //if it's July, or August, or September set the quarter to be April - June of current year
      } else if (month === 6 || month === 7 || month === 8) {
        let year = newStart.getFullYear();
        let startMonth = 4;
        let endMonth = 6;
        let startDate = 1;
        let endDate = 31;
        props.setStartDate(new Date(`${year}-${startMonth}-${startDate}`));
        props.setEndDate(new Date(`${year}-${endMonth}-${endDate}`));
        //if it's October, November, or December, set the quarter to be July - September of current year
      } else if (month === 9 || month === 10 || month === 11) {
        let year = newStart.getFullYear();
        let startMonth = 7;
        let endMonth = 9;
        let startDate = 1;
        let endDate = 30;
        props.setStartDate(new Date(`${year}-${startMonth}-${startDate}`));
        props.setEndDate(new Date(`${year}-${endMonth}-${endDate}`));
      }
    }
  }

  //change the map to focus in on a particular region
  function changeRegion(event) {
    props.setRegion(event.target.value);
  }

  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    props.setAccount(event.target.value);
    setLoadItems(true);
  }

  console.log();

  return (
    <div>
      {
        //select a region menu
      }
      <label for="region">Region: </label>
      <select name="region" value="Select Region" onChange={changeRegion}>
        <option value="World">View World Sales</option>
        <option value="United States">United States</option>
        <option value="Africa">Australia</option>
        <option value="Asia">Asia</option>
        <option value="Australia">Australia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
      </select>
      <br></br>
      <br></br>
      <form method="POST" action="/show-sales">
        {
          //preset date range menu
        }
        <label for="date-preset">View By:</label>
        <select
          name="date-preset"
          value="date-preset"
          onChange={changeDateRange}
        >
          <option value="all-time">All Time</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="six-months">Past Six Month</option>
          <option value="year">Past Year</option>
        </select>

        <br></br>
        <br></br>

        {
          //choose your own start and end date menu
        }
        <label for="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          onChange={changeStartDate}
        ></input>

        <br></br>
        <br></br>

        <label for="endDate">End Date: </label>
        <br></br>
        <input
          type="date"
          id="endDate"
          name="endDate"
          onChange={changeEndDate}
        ></input>

        <br></br>
        <br></br>

        {
          //once the client list has been loaded, create a menu with each client as an option
        }
        {clientList ? (
          <div>
            <label for="account">
              Client:
              <select name="account"
                onChange={changeAccount}
              >
                <option  value="all-accounts">
                  View All Clients
                </option>
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
            <label for="item-list">Items:
            <select name= "item" >
              <option value="all-items">
                View All Items
              </option>
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
        <input type="submit" value="Show Sales!" />
        <br></br>
      </form>
    </div>
  );
};

export default MapToggle;
