/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import axios from "axios";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
// import '../education/education.css';

const API_URL = import.meta.env.VITE_API_URL;

const AddEducation = ({ onClose, setRefresh }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEdType, setSelectedEdType] = useState('');
  const [selectedCert, setSelectedCert] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [saveStatus, setSaveStatus] = useState("Ready");
  const [reload, setReload] = useState(false);

  const [schoolName, setSchoolName] = useState('');
  const [program, setProgram] = useState('');



  const checkFormFields = () => {
    if(schoolName === '' || program === '' || selectedStartDate === '' || selectedEndDate === '' || selectedEdType === '' || selectedCert === ''){
      return true;
    }
    false;
  }

  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

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


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      schoolName,
      program,
      endDate:selectedEndDate,
      beginDate: selectedStartDate,
      earnedCert: selectedCert,
      educationType: selectedEdType
    }

    const storedToken = localStorage.getItem('authToken');

    axios.post(`${API_URL}api/portfolios/${uniqueIdentifier}/educations`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response)
        setSchoolName('');
        setProgram('');
        setSelectedCert('');
        setSelectedEdType('');
        setSelectedStartDate('');
        setSelectedEndDate('');
        setSaveStatus("Success");
        setRefresh(refresh => !refresh);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Add Education</h1>
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
                      className="input is-primary"
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
                      className = "input is-primary"
                      type="text"
                      placeholder = "Program/Course"
                      value = {program}
                      onChange = {(e) => setProgram(e.target.value)}
                    />
                  </p>
                </div>
              </div>
              <div className="column is-half">
                <div className="select is-fullwidth is-primary">
                  <select value = {selectedEdType} onChange = {(e) => setSelectedEdType(e.target.value)}>
                    <option>Education Type</option>
                    <option>Self tutored</option>
                    <option>Bootcamp</option>
                    <option>Tertiary education</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="select is-fullwidth is-primary">
                  <select value = {selectedCert} onChange = {(e) => setSelectedCert(e.target.value)}>
                    <option>Certificate earned</option>
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
                  <label className="label">Start Date:</label>
                  <div className = "control">
                  <Flatpickr
                    className="input is-primary"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      defaultDate: selectedStartDate
                    }}
                  />
                  </div>
                </div>
              </div>
              <div className = "column is-half">
                <div className="field">
                  <label className="label">End Date or Expected End Date:</label>
                  <div className = "control">
                  <Flatpickr
                    className="input is-primary"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      defaultDate: selectedEndDate
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

export default AddEducation
