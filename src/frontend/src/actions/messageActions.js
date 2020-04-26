import axios from 'axios';

export function fetchMessages() {
  return axios.get('/message/fetch');
}

/*
  message needs to look like this
  {
    patient_id: String,
    message: String,
  }
*/
export function createMessage(message) {
  return axios.put('/message/create', message);
};
