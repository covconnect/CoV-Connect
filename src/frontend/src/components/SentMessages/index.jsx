import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import SentMessageSuccess from './SentMessageSuccess';
import AllSentMessages from './AllSentMessages';
import './sentMessages.css';

function SentMessages() {
  const { search } = useLocation();
  const { message, name } = queryString.parse(search);

  if (name && message) {
    return <SentMessageSuccess message={message} name={name} />;
  }

  return (
    <AllSentMessages />
  );
}

export default SentMessages;
