import React from "react";
import settingsIcon from "../svg/settings.svg";
import alertBell from "../svg/alert.svg";
import userPic from "../svg/stock-user.png";
import note from "../svg/note.svg";

const Header = () => {
  return (
    <header id="main-head-flex">
      <div id="head-flex-one">
        {/* <div className="header-svg-wrapper">
          <img src={note} />
        </div> */}

        <div>
          <h3>Executive Financial Dashboard</h3>
        </div>
      </div>
      <div id="head-flex-two">
        <div className="header-svg-wrapper">
          <img src={settingsIcon} />
        </div>

        <div className="header-svg-wrapper">
          <img src={alertBell} />
        </div>
        <div id="user-wrapper">
          <h5>Margarette</h5>
          <img src={userPic} />
        </div>
      </div>
    </header>
  );
};

export default Header;
