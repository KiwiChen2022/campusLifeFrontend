import React from "react";
import { NavLink } from "react-router-dom";
import { FaComments, FaUserAlt, FaCog, FaUserPlus  } from "react-icons/fa";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <div className={styles.navigation}>
      <NavLink to="/homepage" activeClassName={styles.active}>
        <FaComments size={20} />
      </NavLink>
      <NavLink to="/homepage/profile" activeClassName={styles.active}>
        <FaUserAlt size={20} />
      </NavLink>
      {/* <NavLink to="/homepage/settings" activeClassName={styles.active}>
        <FaCog size={20} />
      </NavLink> */}
      <NavLink to="/homepage/friend" activeClassName={styles.active}>
        <FaUserPlus size={20}/>
      </NavLink>
    </div>
  );
}

export default Navigation;
