import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function TestIcon() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Home
      </NavLink>
      <NavLink
        to="/statistics"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Statistics
      </NavLink>
      <NavLink
        to="/currency"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Currency
      </NavLink>
    </nav>
  );
}