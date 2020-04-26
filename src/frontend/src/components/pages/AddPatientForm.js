import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classnames from "classnames";
import Select from 'react-select';
import _map from 'lodash/map';
import { createPatient, fetchPatients, } from '../../actions/patientActions';
import { SET_PATIENTS } from '../../actions/types';

function AddPatientForm() {
  const dispatch = useDispatch();
  const hospitals = useSelector(state => state.hospitals);
  const hospitalList = useMemo(() => _map(hospitals, hospital => ({
    value: hospital.id,
    label: hospital.name,
  })), [hospitals]);
  const [state, setState] = useState({
    patient_name: "",
    dob_date: "",
    dob_month: "",
    dob_year: "",
    unit: "",
    room_number: "",
    selectedHospital: null,
    errors: {},
    successMessage: "",
    errorMessage: "",
    focused: false,
    isSearchable: true
  });
  const { errors, selectedHospital } = state;

  function onChange(e) {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  function clearFields(error) {
    if(!error) {
      setState({ ...state, patient_name: "", dob_month: "", dob_date: "", dob_year: "", selectedHospital: null, errorMessage: "" })
    } else {
      setState({ ...state, errorMessage: error, successMessage: "" })
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const dob = new Date(parseInt(state.dob_year),
                         parseInt(state.dob_month),
                         parseInt(state.dob_date));

    createPatient({
      name: state.patient_name,
      dob: dob.toDateString(),
      hospital_id: state.selectedHospital.value
    }).then((res) => {
      if(res.status === 200) {
        setState({successMessage: res.data.message});
        clearFields(true);

        fetchPatients().then(({ data }) => dispatch({
          type: SET_PATIENTS,
          payload: data,
        }));
      } else {
        setState({errorMessage: res.data.message})
        clearFields(false);
      }
    }).catch((err) => {
      setState({errorMessage: err.message});
      clearFields(false);
    });
  }

  return (
    <div className="row">
      <div className="col s12">

        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h6>
            <b>Add </b> a patient.
          </h6>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h5>
            <b style={{ color: "green" }}>{state.successMessage}</b>
          </h5>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h5>
            <b style={{ color: "red" }}>{state.errorMessage}</b>
          </h5>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <div className="input-field col s12">
            <Select
              isSearchable={state.isSearchable}
              value={selectedHospital}
              onChange={selectedHospital => setState({ selectedHospital })}
              options={hospitalList}
              placeholder="Select Hospital"
            />
          </div>
          <div className="input-field col s12">
            <input
              onChange={onChange}
              value={state.patient_name}
              error={errors.patient_name}
              id="patient_name"
              type="text"
              className={classnames("", {invalid: errors.patient_name})}
            />
            <label htmlFor="patient_name">Patient Name</label>
            <span className="red-text">{errors.patient_name}</span>
          </div>
          <div className="input-field col s12" style={{ paddingTop: 32 }}>
            <div className="row">
              <div className="col s12 m4">
                <input
                  onChange={onChange}
                  value={state.dob_month}
                  id="dob_month"
                  type="text"
                  placeholder="mm"
                  className={classnames("", {invalid: errors.dob_month})}
                />
              </div>
              <div className="col s12 m4">
                <input
                  onChange={onChange}
                  value={state.dob_date}
                  id="dob_date"
                  type="text"
                  placeholder="dd"
                  className={classnames("", {invalid: errors.dob_date})}
                />
              </div>
              <div className="col s12 m4">
                <input
                  onChange={onChange}
                  value={state.dob_year}
                  id="dob_year"
                  type="text"
                  placeholder="yyyy"
                  className={classnames("", {invalid: errors.dob_year})}
                />
              </div>
            </div>
            <label htmlFor="dob">Patient's Date of Birth</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              onChange={onChange}
              value={state.unit}
              error={errors.unit}
              id="unit"
              type="text"
              className={classnames("", {invalid: errors.unit})}
            />
            <label htmlFor="unit">Unit</label>
            <span className="red-text">{errors.unit}</span>
          </div>
          <div className="input-field col s12 m6">
            <input
              onChange={onChange}
              value={state.room_number}
              error={errors.room_number}
              id="room_number"
              type="text"
              className={classnames("", {invalid: errors.room_number})}
            />
            <label htmlFor="room_number">Room Number</label>
            <span className="red-text">{errors.room_number}</span>
          </div>

          <button className="btn blue waves-effect waves-light hoverable">Save Patient</button>
        </form>
      </div>
    </div>
  );
}

export default AddPatientForm;
