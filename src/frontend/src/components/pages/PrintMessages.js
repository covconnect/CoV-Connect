import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import Table from "../layout/Table";
import { Link } from "react-router-dom";

const PrintMessages = () =>
{
    const messages = useSelector((state) => state.printableMessages)
    let message_list = [];
    let print_list = [];

    messages.forEach(
        message =>
        {
            if(print_list.length === 0 || print_list[print_list.length-1].hasOwnProperty("column2"))
                print_list.push({column1:
                        "From: " + message.from +
                        "<br/>To: " + message.to +
                        "\nPatient DOB: " + message.dob +
                        "\nMessage: " + message.message});
            else
                print_list[print_list.length-1]["column2"] =
                        "From: " + message.from +
                        "<br/>To: " + message.to +
                        "\nPatient DOB: " + message.dob +
                        "\nMessage: " + message.message;

            message_list.push(
                {
                    unit: "Unit: " + message.unit,
                    from   : "From: " + message.from,
                    to     : "To: " + message.to,
                    dob    : "DOB: " + message.dob,
                    message: "Message: " + message.message
                });
        });

    const columns = [
        { accessor: "unit" },
        { accessor: "from" },
        { accessor: "to" },
        { accessor: "dob" },
        { accessor: "message" }];

    function print()
    {
        window.print();
    }

    return (
        <div className="center-align">
            <Link to="/">Back</Link>&nbsp;
            <button onClick={print}>Print</button>
            <Table columns={columns} data={message_list}/>
        </div>
    )
}

export default PrintMessages
