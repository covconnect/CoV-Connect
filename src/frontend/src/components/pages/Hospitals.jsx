import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _map from 'lodash/map';
import { createHospital, fetchHospitals } from '../../actions/hospitalActions';
import { SET_HOSPITALS } from '../../actions/types';

function Hospitals() {
  const dispatch = useDispatch();
  const [addingHospital, setAddingHospital] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [editing, setEditing] = useState('');
  const hospitals = useSelector(state => state.hospitals);

  useEffect(() => {
    setAddingHospital(false);
    setAddress('');
    setName('');
    setEditing('');
  }, [hospitals])

  function saveNewHospital() {
    createHospital({ name, address }).then(() => {
      fetchHospitals().then(({ data }) => dispatch({
        type: SET_HOSPITALS,
        payload: data.hospitals,
      }));
    }).catch(console.error);
  }

  function enterEditMode(id, curAddress, curName) {
    setAddress(curAddress);
    setName(curName);
    setEditing(id);
  }

  function cancelEditing() {
    setAddress('');
    setName('');
    setEditing('');
  }

  function updateHospital() {
    // no endpoint yet to create a hospital
  }

  function renderHospital({ id, name, address }) {
    if (editing && editing === id) {
      return (
        <tr key={id}>
          <td>
            <button className="btn btn-small blue" onClick={updateHospital}>
              Save
            </button>
          </td>
          <td>
            <input onChange={(evt) => setName(evt.target.value)}  value={name} />
          </td>
          <td>
            <input onChange={(evt) => setAddress(evt.target.value)} value={address} />
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
            onClick={() => enterEditMode(id, name, address)}
          >
            {editing !== id ? 'Edit' : 'Save'}
          </button>
        </td>
        <td>{name}</td>
        <td>{address}</td>
      </tr>
    )
  }

  return (
    <div className="valign-center">
      <div className="card p-24">
        <div className="row">
          <div className="col s12">
            <h2><b>Manage</b> Hospitals</h2>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Address</th>
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
                      <input onChange={(evt) => setName(evt.target.value)} value={name} />
                    </td>
                    <td>
                      <input onChange={(evt) => setAddress(evt.target.value)} value={address} />
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn blue"
                      disabled={editing}
                      onClick={() => setAddingHospital(!addingHospital)}
                    >
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
