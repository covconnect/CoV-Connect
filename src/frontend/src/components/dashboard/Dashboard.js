import React, { useEffect } from "react";
import { Route, HashRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useInitialLoad } from '../../hooks';
import Sidebar from "../layout/Sidebar";
import sendMessage from "../pages/sendMessage";
import SentMessage from "../pages/SentMessage";
import aboutUs from "../pages/aboutUs";
import DashboardHome from "../pages/DashboardHome";
import { fetchHospitals } from '../../actions/hospitalActions';
import { fetchMessages } from '../../actions/messageActions';
import { fetchPatients } from '../../actions/patientActions';
import { SET_HOSPITALS, SET_MESSAGES, SET_PATIENTS } from '../../actions/types';

// const items = [
//   { destination: "/sendMessage", label: "Send Message" },
//   { destination: "/addPatient", label: "Add Patient" },
//   { destination: "/aboutUs", label: "About Us" },
// ];

function Dashboard() {
  const initialLoad = useInitialLoad();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialLoad) {
      fetchHospitals().then(({ data }) => dispatch({ type: SET_HOSPITALS, payload: data.hospitals }))
      fetchMessages().then(({ data }) => dispatch({ type: SET_MESSAGES, payload: data.messages }))
      fetchPatients().then(({ data }) => dispatch({ type: SET_PATIENTS, payload: data.patients }))
    }
  }, [initialLoad, dispatch])

  const sideBarItems = [
    {
      title: "Messages",
      contents: [
        {
          destination: "/sendMessage",
          label: "Send A Message",
        },
        {
          destination: "/sentMessage",
          label: "All Sent Messages",
        },
      ],
    },
    {
      title: "Survivor Stories",
      contents: [
        {
          destination: "/",
          label: "All Stories",
        },
        {
          destination: "/",
          label: "Share Your Story",
        },
      ],
    },
    {
      title: "Connect with Others",
      contents: [
        {
          destination: "/",
          label: "Join Conversation",
        },
      ],
    },
    {
      title: "Cov-connect",
      contents: [
        {
          destination: "/aboutUs",
          label: "About Us",
        },
        {
          destination: "/",
          label: "How It Works",
        },
        {
          destination: "/",
          label: "Partner Hospitals",
        },
      ],
    },
  ];

  return (
    <HashRouter>
      <div>
        <div>
          <Sidebar items={sideBarItems} left />
        </div>
        <div className="container valign-wrapper" style={{ paddingTop: 32 }}>
          <div className="row">
            <Route exact path="/" component={DashboardHome}/>
            <Route path="/sendMessage" component={sendMessage}/>
            <Route path="/sentMessage" component={SentMessage}/>
            {/* <Route path="/addPatient" component={addPatient} /> */}
            <Route path="/aboutUs" component={aboutUs}/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default Dashboard;
