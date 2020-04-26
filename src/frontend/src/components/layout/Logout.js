import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class Logout extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="center-align">
        {this.props.auth.isAuthenticated ? (
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginTop: "50%",
            }}
            onClick={this.onLogoutClick}
            className="btn waves-effect hoverable blue"
            // "btn btn-medium waves-effect waves-light hoverable blue accent-3 right"
          >
            Logout
          </button>
        ) : null}
      </div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(Logout);
