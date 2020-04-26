import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import { STATUSES } from '../../utils/constants';
import { getPatientNameFromMessage } from '../../utils/helpers';

function AllSentMessages() {
  const [tab, setTab] = useState(0);
  const messages = useSelector(state => state.messages);
  const patients = useSelector(state => state.patients);
  const allMessages = _map(_sortBy(messages, 'createAt'), (msg) => ({
    id: msg._id,
    time: moment(msg.createdAt).format('MM-DD-YYYY hh:mma'),
    patientName: getPatientNameFromMessage(msg, patients),
    status: STATUSES[msg.status],
  }))
  const deliveredMessages = _filter(allMessages, ['status', STATUSES[0]]);

  function getMessages() {
    if (tab === 0) {
      return allMessages;
    }

    return deliveredMessages;
  }

  return (
    <div className="valign-wrapper">
      <div className="card p-12">
        <div className="row">
          <div className="col s12">
            <h2><b>Hello</b> World</h2>
            <p className="grey-text fz-24">
              Keep track of the delivery status of all your sent messages.
              Click on any row to view message details.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6">
                <button
                  onClick={() => setTab(0)}
                  className={classnames(['tab-node', { active: tab === 0 }])}
                >
                  All ({allMessages.length})
                </button>
              </li>
              <li className="tab col s6">
                <button
                  onClick={() => setTab(1)}
                  className={classnames(['tab-node', { active: tab === 1 }])}
                >
                  Delivered ({deliveredMessages.length})
                </button>
              </li>
            </ul>
          </div>
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>Sent Time</th>
                  <th>Patient Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {_map(getMessages(), (msg) => (
                  <tr key={msg.id}>
                    <td>{msg.time}</td>
                    <td>{msg.patientName}</td>
                    <td>{msg.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-8"></div>

            <Link to='/sendMessage' className="btn wave-effect hoverable blue">New Message</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSentMessages;
