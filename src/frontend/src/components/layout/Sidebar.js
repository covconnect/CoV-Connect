import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Logout from "./Logout.js";
import './sidebar.css';

// HAMBURGER NAV ITEMS (HOME)
// Used this object structure to create the sidebar menu items:
/*  {
      title: "Messages",
      contents: [
      {
        destination: "/sendMessage",
        label: "Send A Message",
      },
    }
*/
function Sidebar({ items }) {
  return (
    <div>
      <Menu>
        {items.map(({ title, contents }) => (
          <div className="hamburger-nav">
            <span className="bm-title">{title}</span>
            <ul className="bm-nav-list">
              {contents.map(({ destination, label }) => (
                <li className="bm-nav-list-item">
                  <NavLink
                    key={label}
                    className="menu-item"
                    to={destination}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Logout />
      </Menu>
    </div>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    destination: PropTypes.string,
  })),
};

export default Sidebar;
