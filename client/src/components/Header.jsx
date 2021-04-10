import React from "react";
import settingsIcon from "../svg/settings.svg";
import alertBell from "../svg/alert.svg";

import note from "../svg/note.svg";
import userPic from "../svg/woman-stock-image.png";

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
          <div id="user-id">
            <h5>Margarette</h5>
            <h6>Active</h6>
          </div>
          <img src={userPic} />
        </div>
      </div>
    </header>
  );
};

export default Header;
