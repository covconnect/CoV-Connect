import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import _map from 'lodash/map';
import { STATUSES } from '../../utils/constants';
import { getPatientNameFromMessage } from '../../utils/helpers';

function ManageMessanges() {
  const messages = useSelector(state => state.messages);
  const patients = useSelector(state => state.patients);

  function changeStatus() {
    alert('make me work!');
  }

  return (
    <div className="valign-center">
      <div className="card large p-24">
        <div className="row">
          <div className="col s12">
            <h2><b>Manage</b> Messages</h2>

            <table>
              <thead>
                <tr>
                  <th>Sent Time</th>
                  <th>To</th>
                  <th>Unit</th>
                  <th>Room Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {_map(messages, (msg) => (
                  <tr key={msg._id}>
                    <td>{moment(msg.createdAt).format('MM-DD-YYYY hh:mma')}</td>
                    <td>{getPatientNameFromMessage(msg, patients)}</td>
                    <td>??</td>
                    <td>??</td>
                    <td>
                      <select style={{display: 'block'}} value={msg.status} onChange={changeStatus}>
                        {_map(STATUSES, (status, i) => (
                          <option key={status} value={i}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageMessanges;
