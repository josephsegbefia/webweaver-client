/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import axios from "axios";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
// import '../education/education.css';

const API_URL = import.meta.env.VITE_API_URL;

const AddExperience = ({ onClose, setRefresh }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [location, setLocation] = useState('')
  const [currentPosition, setCurrentPosition] = useState(false);
  const [responsibilities, setResponsibilties] = useState()
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [saveStatus, setSaveStatus] = useState("Ready");
  const [reload, setReload] = useState(false);





  const checkFormFields = () => {
    if (
      company === '' ||
      position === '' ||
      selectedStartDate === '' ||
      responsibilities === '' ||
      location === '' ||
      (selectedEndDate === '' && !currentPosition)
    ) {
      return true;
    }
    return false;
  };

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
      company,
      position,
      endDate:selectedEndDate,
      startDate: selectedStartDate,
      responsibilities,
      location,
      currentPosition
    }

    const storedToken = localStorage.getItem('authToken');

    axios.post(`${API_URL}api/portfolios/${uniqueIdentifier}/experiences`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response)
        setCompany('');
        setPosition('');
        setLocation('');
        setResponsibilties('');
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
          <h1 className="title">Add Experience</h1>
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
                      placeholder="Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
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
                      placeholder = "Position e.g, Junior Product Manager"
                      value = {position}
                      onChange = {(e) => setPosition(e.target.value)}
                    />
                  </p>
                </div>
              </div>
              <div className="column is-half">
                <div className = "field">
                  <p className = "control">
                    <input
                      className = "input"
                      type="text"
                      placeholder = "Location e.g Accra, Ghana"
                      value = {location}
                      onChange = {(e) => setLocation(e.target.value)}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <textarea
                  type = 'text'
                  className='textarea'
                  placeholder='What are/were your responsibilities? Separate each point with a period. Keep it short. About 4 - 6 points are enough.'
                  value = {responsibilities}
                  onChange = {(e) => setResponsibilties(e.target.value)}
                />
              </div>
            </div>
            <div className = "columns">
              <div className = "column">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className = "mr-4"
                    checked = {currentPosition}
                    onChange = {() => setCurrentPosition(!currentPosition)}
                    disabled = {selectedEndDate !== ""}
                  />
                    I still work here.
                </label>
              </div>
            </div>
            <div className = "columns">
              <div className = "column is-half">
                <div className="field">
                  <label className="label">Select Start Date:</label>
                  <div className = "control">
                  <Flatpickr
                    className="input"
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
              <div className = "column is-half" style={{"display": `${currentPosition ? "none" : "block"}`}}>
                <div className="field">
                  <label className="label">Select End Date:</label>
                  <div className = "control">
                  <Flatpickr
                    className="input"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      defaultDate: selectedEndDate,
                      disabled: true
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

export default AddExperience;
