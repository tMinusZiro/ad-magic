import React from "react";
import { useState, useEffect } from "react";
const MapToggle = (props) => {
  //list of countries in database
  const [countriesList, setCountriesList] = useState();
  const [clientList, setClientList] = useState();

  useEffect(() => {
    if (!countriesList) {
      fetch("/countries")
        .then((res) => res.json())
        .then((list) => {
          console.log(list);
          setCountriesList(list);
        });
      console.log(countriesList);
    }
    if (!clientList) {
      fetch("/clients")
        .then((res) => res.json())
        .then((list) => {
          setClientList(list);
        });
    }
  });
  function changeStartDate(event) {
    props.setStartDate(event.target.value);
  }

  function changeEndDate(event) {
    props.setEndDate(event.target.value);
  }

  //change the map to focus in on a particular region
  function changeRegion(event) {
    props.setRegion(event.target.value);
  }
  //change the client account in order to show data from that client then render the item menu for that client
  function changeAccount(event) {
    props.setAccount(event.target.value);
  }

  return (
    <div>
      <form method="POST" action="/start-date">
        <label for="start-date">Start Date: </label>
        <br></br>

        <input
          type="date"
          id="start-date"
          name="start-date"
          onChange={changeStartDate}
        ></input>
        <br></br>
      </form>

      <br></br>

      <label for="start-date">End Date: </label>
      <br></br>
      <input
        type="date"
        id="end-date"
        name="end-date"
        onChange={changeEndDate}
      ></input>
      <br></br>

      <br></br>

      <label for="country">Country: </label>
      <select name="country" value="Select Country" onChange={changeAccount}>
        {countriesList
          ? countriesList.map((country, index) => {
              return (
                <option key={index} id={country} value = {country}>
                  {country}
                </option>
              );
            })
          : null}
      </select>
      <br></br>
      <br></br>

      <form method="POST" action="/account">
        <label for="account">Client: </label>
        <select name="account" value="Select Account" onChange={changeRegion}>
        {clientList
          ? clientList.map((client, index) => {
              return (
                <option key={index} id={client} value = {client}>
                  {client}
                </option>
              );
            })
          : null}
      </select>

        <br></br>
      </form>
    </div>
  );
};

export default MapToggle;
