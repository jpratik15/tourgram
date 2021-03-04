import React, { useState } from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLink from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../../components/UIElements/BackDrop";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  let [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen ? <BackDrop onClick={closeDrawerHandler} /> : null}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLink />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
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
