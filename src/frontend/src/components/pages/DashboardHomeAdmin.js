import React from 'react'
import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import _startCase from 'lodash/startCase';

const DashboardHomeAdmin = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
        <div className="center-align">
        <h2 className="blue-text">Welcome back, {_startCase(user.name)}</h2>
        
        <p className="grey-text">Quickly manage unprocessed message. <br /> Print by unit or view sent message details.</p>

        <div
            style={{
                display: 'flex',    
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '488px',
                margin: '0 auto',
            }}
        >
            <p className="blue-text">Filter by Unit</p>
            <select name="filter" style={{ display: 'block', maxWidth: '147px' }}>
                <option value="unit" selected>xxx (5)</option>
            </select>
            <button
                style={{ backgroundColor: '#0CC1E2', width: '153px', borderRadius: '7.5px'}}
                className="btn waves-effect hoverable blue"
            >
                Print Unit
            </button>
        </div>
        </div>
    )
}
export default DashboardHomeAdmin