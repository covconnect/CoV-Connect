import axios from 'axios';

export function fetchHospitals() {
  return axios.get('/hospital/fetch');
}

/*
  hospital needs to look like
  {
    name: String,
    address: String,
  }
*/
export function createHospital(hospital) {
  return axios.put('/hospital/create', hospital);
}
