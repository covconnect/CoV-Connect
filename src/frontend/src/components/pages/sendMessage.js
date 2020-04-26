import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import classnames from "classnames";
import axios from "axios";
import Select from "react-select";
import _map from 'lodash/map';
import AddPatientForm from './AddPatientForm';

function SendMessage() {
  const history = useHistory();
  const [initialLoad, setInitialLoad] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [state, setState] = useState({
    selectedPatient: null,
    message: "",
    errors: {},
    successMessage: "",
    errorMessage: ""
  });
  const { selectedPatient } = state;
  const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
  const fetchPatients = useCallback(() => {
    axios.get('/patient/fetch')
      .then((res) => {
        const patientList = _map(res.data.patients, patient => ({
          value: patient,
          label: patient.patient_details.name,
        }));

        setPatientList(patientList);
      }).catch((err) => {
        setState({ ...state, errorMessage: err.message });
      });
  }, [state, setPatientList, setState]);

  useEffect(() => {
    if (initialLoad) {
      fetchPatients();
      setInitialLoad(false);
    }
  }, [fetchPatients, initialLoad, setInitialLoad]);

  useEffect(() => {
    setShowForm(false);
  }, [ patientList ]);

  function doneSubmitting(error) {
    if(!error) {
      history.push(`/sentMessage?name=${encodeURIComponent(selectedPatient.label)}&message=${encodeURIComponent(state.message)}`)
    } else {
      setState({
        ...state,
        errorMessage: error,
        successMessage: "",
      });
    }
  }

  function onChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  function onSubmit(e) {
    e.preventDefault();

    axios.put('/message/create', {
      patient_id: selectedPatient.value.patient_details.id,
      message: state.message,
    }).then((res) => {
      console.log({ res });
      if(res.status === 200) {
        setState({ successMessage: res.data.message });
        doneSubmitting(false);
      } else {
        doneSubmitting(res.data.message);
      }
    }).catch((err) => {
      doneSubmitting(err.message);
    });
  }

  console.log(state.errorMessage);

  return (
    <div className="valign-wrapper">
      <div className="card">
        <div className="row" style={{ padding: 8 }}>
          <div className="col s12">
            <h4 className="grey-text text-darken-1">Send a Message</h4>
            <p className="grey-text">
              Your note will be printed onto labels and affixed to patient's food containers.
              <br />
              Tell them how much you care!
            </p>

            <h5 className="blue-text"><b>Patient</b></h5>
            <p className="grey-text">
              Select your recipient from the drop-down, or create
              a new patient if you are sending for the first time.
            </p>
          </div>

          <div className="col s12">
            <Select
              styles={selectStyles}
              value={selectedPatient}
              onChange={selectedPatient => setState({ ...state, selectedPatient })}
              options={patientList}
              placeholder="Select Patient"
            />
          </div>

          <div className="col s12" style={{ marginTop: 16 }}>
            {
              showForm
                ? <button
                  className="btn grey waves-effect waves-light hoverable"
                  type="button"
                  onClick={() => setShowForm(!showForm)}
                >
                  Cancel New Patient
                </button>
                : <button
                  className="btn blue waves-effect waves-light hoverable"
                  type="button"
                  onClick={() => setShowForm(!showForm)}
                >
                  New Patient
                </button>
            }
            <div style={{ display: showForm ? 'block' : 'none' }}>
              <AddPatientForm onSave={fetchPatients} />
            </div>
          </div>


          <div className="col s12 mt-40" style={{ paddingLeft: "11.250px" }}>
            <h5 className="blue-text">
              <b>Your message</b>
            </h5>
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
              <textarea
                onChange={onChange}
                value={state.message}
                id="message"
                type="text"
                data-length="500"
                className={classnames("materialize-textarea ", {invalid: state.errorMessage})}
              />
              <label htmlFor="message">Message</label>
              <span className="red-text">{state.errorMessage}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
