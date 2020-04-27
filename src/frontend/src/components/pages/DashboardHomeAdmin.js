import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import _startCase from 'lodash/startCase';
import MessagesAdmin from './MessagesAdmin'
import Modal from '../dashboard/Modal'

const DashboardHomeAdmin = () => {
    const { user } = useSelector((state) => state.auth)
    const messages = useSelector((state) => state.messages)
    // Info to be passed to modal or to print 
    const [ messageDetails, setMessageDetails ] = useState({});
    const [ showPrintModal, setShowPrintModal ] = useState(false);

    const handleClickPrint = (msg) => {
        setMessageDetails(msg);
        setShowPrintModal(true);
    } 

    const showMessages = (messages) => {
        if(!messages?.length){
            return <p className="grey-text">No Messages</p>
        }

        return (
            messages.map((msg, i) => (<MessagesAdmin key={`${msg.room}${msg.unit}${i}`} message={msg} handlePrintClick={handleClickPrint}/>))
        )
    }

    return (
        <>
            <div className="center-align" style={{ margin: '0 auto', width: '100%'}}>
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
                    <select name="filter" style={{ display: 'block', maxWidth: '147px', textAlign: 'center' }}>
                        <option value="unit" defaultValue>xxx (5)</option>
                    </select>
                    <button
                        style={{ backgroundColor: '#0CC1E2', width: '153px', borderRadius: '7.5px'}}
                        className="btn waves-effect hoverable blue"
                    >
                        Print Unit
                    </button>
                </div>
            </div>
            <div>
                <div className="white z-depth-1" style={{ padding: '60px 20px', marginTop: '36px'}}>
                    <table>
                        <thead>
                            <tr style={{ borderColor: '#009DBB', textIndent: '47px'}}>
                                <th>Room</th>
                                <th>Unit</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th style={{textIndent: '45%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { showMessages(messages) }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={showPrintModal}/>
        </>
    )
}
export default DashboardHomeAdmin