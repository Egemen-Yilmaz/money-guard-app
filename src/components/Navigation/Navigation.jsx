import React from "react";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navContainer}>
      <ul className={css.navList}>
        {/* Home */}
        <li className={css.navItem}>
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              isActive ? css.active : css.navButton
            }
            end
          >
            <Icon id="icon-icon-home" name="home" className={css.navIcon} />
            <span className={css.navText}>Home</span>
          </NavLink>
        </li>

        {/* Statistics */}
        <li className={css.navItem}>
          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              isActive ? css.active : css.navButton
            }
          >
            <Icon
              id="icon-icon-statistics"
              name="statistics"
              className={css.navIcon}
            />
            <span className={css.navText}>Statistics</span>
          </NavLink>
        </li>

        {/* Currency (sadece mobil) */}
        <li className={`${css.navItem} ${css.mobileOnly}`}>
          <NavLink
            to="/dashboard/currency"
            className={({ isActive }) =>
              isActive ? css.active : css.navButton
            }
          >
            <Icon
              id="icon-icon-currency"
              name="currency"
              className={css.navIcon}
            />
            {/* Mobil için sadece ikon, metin yok */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
