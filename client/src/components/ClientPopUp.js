import React from "react";
import popupicon from "./../svg/popupicon.png";
import arrow from "./../svg/arrow.svg";

const ClientPopUp = (props) => {
  // const [list, createList] = useState()

  let array = [];

  for (let i = 0; i < props.clientListInRange.length / 2; i += 2) {
    array.push(
      `${props.clientListInRange[i]}: $${props.clientListInRange[i + 1]}`
    );
  }
  console.log(array);

  function hidePopup(event) {
    props.setShowClients(false);
  }

  console.log(props.clientListInRange);

  if (props.showClients) {
    return (
      <div
        class="popup-wrapper"
        style={props.showClients ? { display: "flex" } : { display: "none" }}
      >

        <div class="popup">

          <div id="left-popup">

            <div id="popup-item">
              <img id="popup-icon" src={popupicon} /> Clients
            </div>

            <div id="popup-item">
              Sales Range<br></br> ${props.min} - ${props.max}
              <br></br>
              <img src={arrow} id="arrow-icon" />
            </div>

          </div>




          <div id="right-popup">

              <div id="exit-popup">
            <button id="exit-button" onClick={hidePopup}> X
            </button></div>

            <div id="client-list"> 
            <ul>
              {array.map((client, index) => {
                return <li key={index}>{client}</li>;
              })}
            </ul></div>

          </div>




        </div>

      </div>
    );
  } else return null;
};

export default ClientPopUp;
