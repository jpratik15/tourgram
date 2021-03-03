import React from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLink from "./NavLinks"

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">ToursGram</Link>
      </h1>
      <nav><NavLink /></nav>
    </MainHeader>
  );
};
export default MainNavigation;
