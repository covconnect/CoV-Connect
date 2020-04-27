import axios from 'axios';

export function fetchHospitals()
{
  return axios.get('/hospital/fetch');
}

/*
  hospital needs to look like
  {
    name: String,
    email: String,
    address: String,
    units: Array
  }
*/
export function createHospital(hospital) {
  hospital.units = hospital.units.split('\n');
  return axios.put('/hospital/create', hospital);
}
