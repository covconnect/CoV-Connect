import React from 'react'
import { useSelector } from 'react-redux';
import _startCase from 'lodash/startCase';

const DashboardHomeAdmin = () => {
    const { user } = useSelector((state) => state.auth)
    const messages = useSelector((state) => state.messages)

    const showMessages = (messages) => {
        if(!messages?.length){
            return <p className="grey-text center">No Messages</p>
        }

        return (
            messages.map(m => (
                <div as="ul" style={{textAlign: 'center', display: 'flex', alignItems: 'center'}}>
                    <div as="li" className="grey-text" style={{ marginBottom: '66px',  width: 'calc(2 / 12 * 100%)'}}>{m.room}</div>
                    <div as="li" className="grey-text" style={{ marginBottom: '66px',  width: 'calc(1 / 12 * 100%)'}}>{m.unit}</div>
                    <div as="li" className="grey-text" style={{ marginBottom: '66px',  width: 'calc(2 / 12 * 100%)'}}>{m.name}</div>
                    <div as="li" className="grey-text" style={{ marginBottom: '66px', width: 'calc(2 / 12 * 100%)'}}>{m.dob}</div>
                    <div as="li" style={{ marginBottom: '66px', width: 'calc(4 / 12 * 100%'}}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button className="btn waves-effect hoverable" style={{ width: '127px', marginRight: '16px', background: 'rgba(94,147,151)', borderRadius: '10px'}}>View</button>
                            <button className="btn waves-effect hoverable blue" style={{ width: '127px', borderRadius: '10px'}}>Print</button>
                        </div>
                    </div>
                </div>
            ))
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
                <div className="white z-depth-1" style={{ padding: '60px 0', marginTop: '36px'}}>
                    <div as="ul" className="row" style={{textAlign: 'center', marginBottom: '24px'}}>
                        <div as="li" className="col s2 grey-text">Room</div>
                        <div as="li" className="col s1 grey-text">Unit</div>
                        <div as="li" className="col s2 grey-text">Name</div>
                        <div as="li" className="col s2 grey-text">Date of Birth</div>
                        <div as="li" className="col s4 grey-text">Action(s)</div>
                    </div>
                    <div style={{height: '1px', backgroundColor: '#009DBB', margin: "0 20px", marginBottom: '35px'}}></div>
                    <div className="row">
                        { showMessages(messages) }
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardHomeAdmin