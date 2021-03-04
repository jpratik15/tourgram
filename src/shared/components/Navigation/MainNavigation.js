import React, { useState } from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLink from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../../components/UIElements/BackDrop"

import "./MainNavigation.css";

const MainNavigation = (props) => {
  let [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  }

  const closeDrawer = () => {
    setDrawerIsOpen(false); 
  }

  return (
    <React.Fragment>
      
      {drawerIsOpen ? <BackDrop onClick={closeDrawer}/> :null }

      {drawerIsOpen ? (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLink />
          </nav>
        </SideDrawer>
      ) : null}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
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
