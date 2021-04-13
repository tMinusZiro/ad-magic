import React from "react";
import popupicon from "./../svg/popupicon.png";
import arrow from "./../svg/arrow.svg";
import exit from "./../svg/exit.png";

const ClientPopUp = (props) => {

  let array = [];
  for (let i = 0; i < props.clientListInRange.length / 2; i += 2) {
    array.push(
      `${props.clientListInRange[i]}: $${props.clientListInRange[i + 1]}`
    );
  }

  //hide the popup when user clicks the X in corner 
  function hidePopup(event) {
    props.setShowClients(false);
  }

  if (props.showClients) {
    return (
      <div
        className="popup-wrapper"
        style={props.showClients ? { display: "flex" } : { display: "none" }}
      >
        <div className="popup">
          <div id="left-popup">
            <div id="popup-title">
              <img id="popup-icon" src={popupicon} alt="graph"/> Clients
            </div>

            <div id="popup-item">
              <div>
                Sales Range<br></br> ${props.min} - ${props.max}
              </div>
              <img src={arrow} id="arrow-icon" alt="arrow icon" />
            </div>
          </div>

          <div id="right-popup">
            <div id="client-list">
              <ul>
                {array.map((client, index) => {
                  return (
                    <li id="client-list-item" key={index}>
                      {client}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div id="exit-popup" onClick={hidePopup}>
              <img src={exit} alt="X arrow"/>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default ClientPopUp;
