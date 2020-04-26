import _find from 'lodash/find';

export function getPatientFromMessage(msg, patients) {
  try {
    return _find(patients, ({ patient_details }) => patient_details.id === msg.patient_id).patient_details
  } catch (err) {
    return { name: 'Patient Name Unkown' };
  }
}

export function getPatientNameFromMessage(msg, patients) {
  try {
    return getPatientFromMessage(msg, patients).name;
  } catch (err) {
    return 'Patient Name Unkown';
  }
}
