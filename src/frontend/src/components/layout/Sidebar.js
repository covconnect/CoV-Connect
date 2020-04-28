import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const userSection = {
  title: "Messages",
  contents: [
    {
      destination: "/sendMessage",
      label: "Send A Message",
    },
    {
      destination: "/sentMessage",
      label: "Sent Messages",
    },
  ],
}

const adminSection = {
  title: 'Admin',
  contents: [{
    destination: '/hospitals',
    label: 'Manage Hospitals',
  }],
};

const hospitalAdminSection = {
  title: 'Messages',
  contents: [{
    destination: '/manageMessages',
    label: 'Manage Messages',
  }],
}

function Sidebar({ items }) {
  const { user } = useSelector(state => state.auth);
  const { type } = user;
  const allItems = useMemo(() => {
    switch (type) {
      case 'admin': return [adminSection];
      case 'hospital_admin': return [hospitalAdminSection];
      case 'user':
      default: return [userSection];
    }
  }, [items, type]);

  return (
    <div>
      <Menu>
        {allItems.map(({ title, contents }) => (
          <div className="hamburger-nav" key={title}>
            <span className="bm-title">{title}</span>
            <ul className="bm-nav-list">
              {contents.map(({ destination, label }) => (
                <li className="bm-nav-list-item" key={label}>
                  <NavLink
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
