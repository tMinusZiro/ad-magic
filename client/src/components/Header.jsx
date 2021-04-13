import React from "react";
import settingsIcon from "../svg/settings.svg";
import alertBell from "../svg/alert.svg";
import userPic from "../svg/user.jpeg";

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
          <img src={settingsIcon} alt="settings icon"/>
        </div>

        <div className="header-svg-wrapper">
          <img src={alertBell} alt="alert bell"/>
        </div>
        <div id="user-wrapper">
          <div id="user-id">
            <h5>Margaret</h5>
            <h6>Active</h6>
          </div>
          <img src={userPic} alt="user"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
