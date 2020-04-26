import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Landing({ history }) {
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (isAuthenticated) {
      history.push('/dashboard')
    }
  }, [history, isAuthenticated]);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Connecting</b> family with patients.
          </h4>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large btn-flat waves-effect white black-text"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
