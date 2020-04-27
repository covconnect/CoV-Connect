import React from 'react';
import PropTypes from 'prop-types';

const MessagesAdmin = ({ message, handlePrintClick })=> {
    const {
        room,
        unit,
        name,
        dob
    } = message;

    return (
        <>
            <tr style={{ borderColor: 'transparent', textIndent: '47px'}}>
                <td className="grey-text" style={{ fontWeight: 'normal'}}>{room}</td>
                <td className="grey-text" style={{ fontWeight: 'normal'}}>{unit}</td>
                <td className="grey-text" style={{ fontWeight: 'normal'}}>{name}</td>
                <td className="grey-text" style={{ fontWeight: 'normal'}}>{dob}</td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button 
                            className="btn waves-effect hoverable" 
                            style={{ width: '127px', marginRight: '16px', background: 'rgba(94,147,151)', borderRadius: '10px'}}
                        >
                            View
                        </button>
                        <button 
                            className="btn waves-effect hoverable blue" 
                            style={{ width: '127px', borderRadius: '10px'}}
                            onClick={() => handlePrintClick(message)}
                        >
                            Print
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}

MessagesAdmin.propTypes = {
    message: PropTypes.shape({
        room: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
    }),
}

export default MessagesAdmin;