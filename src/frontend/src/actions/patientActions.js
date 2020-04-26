import axios from 'axios';

export function fetchPatients() {
  return axios.get('/patient/fetch');
}

/*
  patient needs to look like
  {
    name: String,
    dob: Date,
    hospital_id: String,
  }
*/
export function createPatient(patient) {
  return axios.put('/patient/create', patient)
}
