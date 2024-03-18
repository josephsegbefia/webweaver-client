/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

const EditEducation = ({ onClose, edId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEdType, setSelectedEdType] = useState('');
  const [selectedCert, setSelectedCert] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [saveStatus, setSaveStatus] = useState("Ready");
  const [schoolName, setSchoolName] = useState('');
  const [program, setProgram] = useState('');
  const [reload, setReload] = useState(false);

  const checkFormFields = () => {
    if(schoolName === '' || program === '' || selectedStartDate === '' || selectedEndDate === '' || selectedEdType === '' || selectedCert === ''){
      return true;
    }
    false;
  }



  console.log("edId====>", edId);
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date[0]);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date[0]);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }


  const handleSubmit = () => {

  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Edit Education</h1>
          {errorMessage && (
            <article className="message is-danger">
              <div className="message-header">
                <p>Error</p>
                <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
              </div>
              <div className = "message-body">
                {errorMessage}
              </div>
            </article>
          )}
          <form onSubmit={handleSubmit}>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="School Name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className = "column is-half">
                <div className = "field">
                  <p className = "control">
                    <input
                      className = "input"
                      type="text"
                      placeholder = "Program/Course"
                      value = {program}
                      onChange = {(e) => setProgram(e.target.value)}
                    />
                  </p>
                </div>
              </div>
              <div className="column is-half">
                <div className="select is-fullwidth">
                  <select value = {selectedEdType} onChange = {(e) => setSelectedEdType(e.target.value)}>
                    <option>Select Education Type</option>
                    <option>Self tutored</option>
                    <option>Bootcamp</option>
                    <option>Tertiary education</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="select is-fullwidth">
                  <select value = {selectedCert} onChange = {(e) => setSelectedCert(e.target.value)}>
                    <option>Select certificate earned</option>
                    <option>Under graduate</option>
                    <option>Post graduate</option>
                    <option>other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className = "columns">
              <div className = "column is-half">
                <div className="field">
                  <label className="label">Select Start Date:</label>
                  <div className = "control">
                  <Flatpickr
                    className="input"
                    // value={selectedStartDate}
                    // onChange={handleStartDateChange}
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      // defaultDate: selectedStartDate
                    }}
                  />
                  </div>
                </div>
              </div>
              <div className = "column is-half">
                <div className="field">
                  <label className="label">Select End Date:</label>
                  <div className = "control">
                  <Flatpickr
                    className="input"
                    // value={selectedEndDate}
                    // onChange={handleEndDateChange}
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      // defaultDate: selectedEndDate
                    }}
                  />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                {/* <button className="button is-success action" disabled = {checkFormFields()} type = "submit">Save</button> */}
                {
                  {
                    Saving: (
                      <button className = "button is-success action" value = "Creating..." type = "submit" disabled = {true}>Saving...</button>
                    ),
                    Success: (
                      <button className = "button is-success action" value = "Saved" type = "submit" disabled = {true}>Saved!</button>
                    ),
                    Error: (
                      <button className = "button is-success action" value = "Save Failed - Retry?" type = "submit"></button>
                    ),
                    Ready: (
                      <button className = "button is-success action" value = "Save" type = "submit" disabled = {checkFormFields()}>Save</button>
                    )
                  }[saveStatus]
                }
              </div>
              <div className="column">
                <button className="button is-danger action" onClick = {handleClose}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default EditEducation
