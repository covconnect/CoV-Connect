import React from "react";
import { Route, HashRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Sidebar from "../layout/Sidebar";
import sendMessage from "../pages/sendMessage";
import SentMessage from "../pages/SentMessage";
import AddPatientForm from "../pages/AddPatientForm";
import aboutUs from "../pages/aboutUs";
import DashboardHome from "../pages/DashboardHome";


function Dashboard() {
  const items = [
    { destination: "/sendMessage", label: "Send Message" },
    { destination: "/addPatient", label: "Add Patient" },
    { destination: "/aboutUs", label: "About Us" },
  ];

  return (
    <HashRouter>
      <div>
        <div>
          <Sidebar items={items} left/>
        </div>
        <div className="container valign-wrapper" style={{ paddingTop: 32 }}>
          <div className="row">
            <Route exact path="/" component={DashboardHome}/>
            <Route path="/sendMessage" component={sendMessage}/>
            <Route path="/sentMessage" component={SentMessage}/>
            <Route path="/addPatient" component={AddPatientForm}/>
            <Route path="/aboutUs" component={aboutUs}/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(Dashboard);
