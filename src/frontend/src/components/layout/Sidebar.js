import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { slide as Menu } from 'react-burger-menu';
import { logoutUser } from "../../actions/authActions";
import './sidebar.css'

function Sidebar({ items }) {
  const dispatch = useDispatch();

  function onLogoutClick(e) {
    dispatch(logoutUser());
  };

  return (
    <Menu>
      {items.map(({ label, destination }) => (
        <NavLink
          key={label}
          className="menu-item"
          to={destination}
          style={{ cursor: "pointer" }}
        >
          {label}
        </NavLink>
      ))}
      <span className="spacing"></span>
      <button
        type="button"
        onClick={onLogoutClick}
        className="btn btn-medium waves-effect waves-light hoverable blue accent-3 logout-button"
      >
        Logout
      </button>
    </Menu>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    destination: PropTypes.string,
  })),
};

export default Sidebar;
