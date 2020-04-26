import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authActions";


function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  function onLogoutClick(e) {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <Link
            to="/"
            style={{
              fontFamily: "monospace"
            }}
            className="col s5 brand-logo center blue-text"
          >
            <i className="material-icons green-text">favorite</i>
            Cov-Connect
          </Link>
          {
            isAuthenticated ?
            <button
              style={{
                width: "150px",
                borderRadius: "4px",
                letterSpacing: "1.5px",
                marginTop: "14px",
                marginRight: "10px"
              }}
              type="button"
              onClick={onLogoutClick}
              className="btn btn-medium waves-effect waves-light hoverable blue accent-3 right"
            >
              Logout
            </button> :
            null
          }
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
