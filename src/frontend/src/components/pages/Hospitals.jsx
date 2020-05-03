import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _map from 'lodash/map';


import { createHospital, fetchHospitals } from '../../actions/hospitalActions';
import { SET_HOSPITALS } from '../../actions/types';


function Hospitals()
{
  const dispatch = useDispatch();

  const [addingHospital, setAddingHospital] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [units, setUnits] = useState('');
  const [editing, setEditing] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const hospitals = useSelector(state => state.hospitals);

  useEffect(
      () =>
      {
          setAddingHospital(false);
          setAddress('');
          setName('');
          setEmail('');
          setUnits('');
          setEditing('');
      }, [hospitals])

  function saveNewHospital()
  {
    createHospital({ name, email, address, units })
        .then(
            () =>
            {
                setSuccessMessage("Hospital registered successfully.")

                fetchHospitals()
                    .then(({ data }) => dispatch({type: SET_HOSPITALS, payload: data.hospitals}))
                    .catch(err => setErrorMessage(err.message));
            })
        .catch(err => setErrorMessage(err.message));
  }

  function enterEditMode(id, curAddress, curName, curEmail, curUnits)
  {
    setAddress(curAddress);
    setName(curName);
    setEmail(curEmail);
    setUnits(curUnits);
    setEditing(id);
  }

  function cancelEditing()
  {
    setAddress('');
    setName('');
    setEmail('');
    setUnits('');
    setEditing('');
  }

  function updateHospital()
  {
    // no endpoint yet to create a hospital
  }

  function renderHospital({ id, name, address, email, units })
  {
    if (editing && editing === id)
    {
      return (
          <tr key={id}>
            <td>
              <button className="btn btn-small blue" onClick={updateHospital}>
                Save
              </button>
            </td>
            <td>
              <input
                  onChange={(evt) => setName(evt.target.value)}
                  value={name} />
            </td>
            <td>{email}</td>
            <td>
              <input
                  onChange={(evt) => setAddress(evt.target.value)}
                  value={address} />
            </td>
            <td>
              <textarea
                  onChange={(evt) => setUnits(evt.target.value)}
                  qvalue={units.join('\n')} />
            </td>
            <td>
              <button
                  className="btn btn-small grey lighten"
                  onClick={cancelEditing}
              >
                Cancel
              </button>
            </td>
          </tr>
      )
    }

    return (
        <tr key={id}>
          <td>
            <button
                className="btn btn-small blue"
                disabled={addingHospital || (editing && editing !== id)}
                onClick={() => enterEditMode(id, name, address, email, units)}
            >
              {editing !== id ? 'Edit' : 'Save'}
            </button>
          </td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{address}</td>
          <td>{units.join(', ')}</td>
        </tr>
    )
  }

  return (
      <div className="valign-center">
        <div className="card p-24">
          <div className="row">
            <div className="col s12">
              <h2><b>Manage</b> Hospitals</h2>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5><b style={{ color: "green" }}>{successMessage}</b></h5>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5><b style={{ color: "red" }}>{errorMessage}</b></h5>
              </div>
              <table>
                <thead>
                <tr>
                  <th/>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Units</th>
                </tr>
                </thead>
                <tbody>
                {_map(hospitals, renderHospital)}
                {addingHospital && (
                    <tr>
                      <td>
                        <button onClick={saveNewHospital} className="btn btn-small blue">
                          Save
                        </button>
                      </td>
                      <td>
                        <input
                            onChange={(evt) => setName(evt.target.value)}
                            value={name}
                            placeholder="Name"/>
                      </td>
                      <td>
                        <input
                            onChange={(evt) => setEmail(evt.target.value)}
                            value={email}
                            placeholder="Email"/>
                      </td>
                      <td>
                        <input
                            onChange={(evt) => setAddress(evt.target.value)}
                            value={address}
                            placeholder="Address"/>
                      </td>
                      <td>
                        <textarea
                            onChange={(evt) => setUnits(evt.target.value)}
                            value={units}
                            placeholder="Units. One on each line."/>
                      </td>
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan="5">
                    <button
                        style={{ marginLeft: "40%" }}
                        className="btn blue"
                        disabled={editing}
                        onClick={() => setAddingHospital(!addingHospital)}>
                      {addingHospital ? 'Cancel' : 'Add Hospital'}
                    </button>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}


export default Hospitals;
