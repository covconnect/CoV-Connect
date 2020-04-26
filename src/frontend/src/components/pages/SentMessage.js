import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

function SentMessage() {
  const { search } = useLocation();
  const parsed = queryString.parse(search);

  return (
    <div className="valign-wrapper">
      <div className="row">
        <div className="col s12">
          <h2 className="center blue-text"><b>Message</b> Sent!</h2>
        </div>
        <div className="col s12">
          <div className="card p-12">
            <h5 className="review-title blue-text m-0 fw-b">Patient Name</h5>
            <p className="pl-24" style={{ fontSize: 18, color: '#666' }}>{parsed.name}</p>

            <h5 className="review-title blue-text m-0 mt-40 fw-b">Your Message</h5>
            <p className="pl-24" style={{ fontSize: 18, color: '#666' }}>{parsed.message}</p>

            <Link to="/sendMessage" className="btn waves-effect waves-light hoverable blue mt-48 w-100">Send Another Message</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentMessage;
