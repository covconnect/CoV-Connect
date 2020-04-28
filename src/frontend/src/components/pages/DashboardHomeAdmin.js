import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import _startCase from 'lodash/startCase';
import Select from "react-select";
import Table from "../layout/Table";
import {SET_PRINT_MESSAGES} from "../../actions/types";
import {Link} from "react-router-dom";

const DashboardHomeAdmin = () =>
{
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const messages = useSelector((state) => state.messages)
    let messages_by_unit = {};
    let unit_list = [];

    const [state, setState] = useState(
        {
            selectedUnit: null,
            isSearchable: true,
            selectedMessageList: []
        });

    const { selectedUnit, selectedMessageList } = state;

    messages.forEach(
        message =>
        {
            if(!messages_by_unit.hasOwnProperty(message.unit))
            {
                unit_list.push({value: message.unit, label: message.unit});
                messages_by_unit[message.unit] = [];
            }

            messages_by_unit[message.unit].push(message);
        })

    const columns = [
        { Header: "Unit", accessor: "unit" },
        { Header: "From", accessor: "from" },
        { Header: "To", accessor: "to" },
        { Header: "Date of Birth", accessor: "dob" }];

    function printMessages()
    {
        dispatch({ type: SET_PRINT_MESSAGES, payload: selectedMessageList });
    }

    return (
        <div>
            <div className="center-align">
                <h1 className="blue-text">Welcome back, {_startCase(user.name)}</h1>
                <div className="input-field col s12">
                    <div className="row">
                        <div className="col s12 m4" style={{ marginLeft: "20%" }}>
                            <Select
                                isSearchable={state.isSearchable}
                                value={selectedUnit}
                                onChange={
                                    selectedUnit =>
                                        setState({
                                                     selectedMessageList:
                                                         messages_by_unit[selectedUnit.value] })}
                                options={unit_list.length ? unit_list : []}
                                placeholder="Select Unit"
                            />
                        </div>
                        <div className="col s12 m4">
                            <Link
                                style={{ backgroundColor: '#0CC1E2', width: '253px', marginTop: "4%"}}
                                className="btn waves-effect hoverable blue"
                                to="/printMessages"
                                onClick={printMessages}
                            >
                                Print Messages
                            </Link>
                        </div>
                    </div>
                    <div className="white z-depth-1" style={{ padding: '20px 40px 30px 40px', marginTop: '36px'}}>
                        <Table columns={columns} data={selectedMessageList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHomeAdmin
