import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _map from 'lodash/map';

const STATUSES = [
  'Delivered',
  'Processing',
];

function AllSentMessages() {
  const [tab, setTab] = useState(0);
  const messages = useSelector(state => state.messages);
  const patients = useSelector(state => state.patients);
  const allMessages = _map([], (msg) => ({
    time: moment(msg.timestamp).format('mm-dd-yyyy hh:mma'),
    patientName: _find(patients, ['id', msg.patient_id]).name,
    status: STATUSES[msg.status],
  }))
  const deliveredMessages = _filter(allMessages, ['status', STATUSES[0]]);

  function renderTab() {
    if (tab === 0) {
      return <div>Delivered: {JSON.stringify(allMessages)}</div>
    }

    return <div>Delivered: {JSON.stringify(deliveredMessages)}</div>
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



        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s6">
                <button
                  onClick={() => setTab(0)}
                  className={classnames(['tab-node', { active: tab === 0 }])}
                >
                  All ({allMessages.length})
                </button>
              </li>
              <li class="tab col s6">
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
            {renderTab()}
          </div>
        </div>



      </div>
    </div>
  );
}

export default AllSentMessages;
