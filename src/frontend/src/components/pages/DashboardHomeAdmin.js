import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import _startCase from 'lodash/startCase';
import { useTable } from "react-table";
import Select from "react-select";

const DashboardHomeAdmin = () =>
{
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

    const Table = ({ columns, data }) =>
    {
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
                  useTable({ columns, data });

        return (
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    };

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
                            <button
                                style={{ backgroundColor: '#0CC1E2', width: '253px', marginTop: "4%"}}
                                className="btn waves-effect hoverable blue"
                            >
                                Print Messages
                            </button>
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
