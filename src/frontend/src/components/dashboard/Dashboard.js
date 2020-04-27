import React, { useEffect } from "react";
import { Route, HashRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInitialLoad } from '../../hooks';
import Sidebar from "../layout/Sidebar";
import sendMessage from "../pages/sendMessage";
import SentMessage from "../pages/SentMessage";
import aboutUs from "../pages/aboutUs";
import DashboardHome from "../pages/DashboardHome";
import DashboardHomeAdmin from '../pages/DashboardHomeAdmin';
import Hospitals from "../pages/Hospitals";
import ManageMessages from "../pages/ManageMessages";
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
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (initialLoad) {
      fetchHospitals().then(({ data }) => dispatch({ type: SET_HOSPITALS, payload: data.hospitals }))
      fetchMessages().then(({ data }) => dispatch({ type: SET_MESSAGES, payload: data.messages }))
      fetchPatients().then(({ data }) => dispatch({ type: SET_PATIENTS, payload: data.patients }))
    }
  }, [initialLoad, dispatch])

  const sideBarItems = [
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
        <div className="container" style={{ paddingTop: 32 }}>
          { user.type === 'admin' ? 
            <Route exact path="/" component={DashboardHomeAdmin}/> :
            <Route exact path="/" component={DashboardHome}/>
          }
          <div className="row w-100">
            <Route path="/sendMessage" component={sendMessage}/>
            <Route path="/sentMessage" component={SentMessage}/>
            {/* <Route path="/addPatient" component={addPatient} /> */}
            <Route path="/aboutUs" component={aboutUs}/>
            <Route path="/hospitals" component={Hospitals}/>
            <Route path="/manageMessages" component={ManageMessages}/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default Dashboard;
