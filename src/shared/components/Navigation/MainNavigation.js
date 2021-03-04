import React from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLink from "./NavLinks";
import SideDrawer from "./SideDrawer";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <React.Fragment>
      <SideDrawer>
        <nav className="main-navigation__drawer-nav">
          <NavLink />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">ToursGram</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLink />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};
export default MainNavigation;
