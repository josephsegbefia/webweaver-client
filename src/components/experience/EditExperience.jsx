/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';


const API_URL = import.meta.env.VITE_API_URL;

const EditExperience = ({ onClose, exId, refresh }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState(undefined);
  const [location, setLocation] = useState('')
  const [currentPosition, setCurrentPosition] = useState("");
  const [responsibilities, setResponsibilties] = useState()
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [saveStatus, setSaveStatus] = useState("Ready");
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);


  const { user } = useContext(AuthContext);

  let uniqueIdentifier;

  if(user){
    uniqueIdentifier = user.uniqueIdentifier;
  }

  console.log(currentPosition);

  const checkFormFields = () => {
    if (
      company === '' ||
      position === '' ||
      selectedStartDate === '' ||
      responsibilities === '' ||
      location === ''
    ) {
      return true;
    }
    return false;
  };


  const handleStartDateChange = (date) => {
    setSelectedStartDate(date[0]);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date[0] || ''; //date[0] ? date[0] : ''; // Format date to string if date exists, otherwise set to null
    setSelectedEndDate(formattedDate);
    if(selectedEndDate){
      setCurrentPosition(false);
    } else {
      setCurrentPosition(true);
    }

    console.log("current Position==>", currentPosition)
  };


  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }

  const fetchExperience = () => {
    setLoading(true);
    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/experiences/${exId}`)
      .then((response) => {
        const data = response.data;
        setCompany(data.company);
        setLocation(data.location);
        setSelectedStartDate(data.startDate);
        setSelectedEndDate(data.endDate);
        setResponsibilties(data.responsibilities);
        setCurrentPosition(data.currentPosition);
        setPosition(data.position);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }

  console.log(selectedEndDate);
  // console.log(currentPosition)

  useEffect(() => {
    fetchExperience()
  }, [uniqueIdentifier, exId])


  console.log(currentPosition);

  const handleSubmit = (e) => {
    e.preventDefault();


    const requestBody = {
      company,
      location,
      position,
      responsibilities,
      currentPosition,
      startDate: selectedStartDate,
      endDate: selectedEndDate
    }

    console.log(requestBody)


    const storedToken = localStorage.getItem('authToken');

    axios.put(`${API_URL}api/portfolios/${uniqueIdentifier}/experiences/${exId}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setCompany("");
        setLocation("");
        setCurrentPosition("");
        setResponsibilties("");
        setPosition("")
        setSelectedStartDate("");
        setSelectedEndDate("");
        setSaveStatus("Success");
        refresh(refresh => !refresh);
        handleClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Edit Experience</h1>
          {loading && (
            <div className="columns is-vcentered">
              <div className="column">
                <progress className='progress is-medium is-link' max='100' style={{height: "4px"}}>
                  60%
                </progress>
              </div>
            </div>
          )}
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
            {/* <div className = "columns">
              <div className = "column">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className = "mr-4"
                    checked = {currentPosition}
                    onChange = {() => setCurrentPosition(!currentPosition)}
                    disabled = {selectedEndDate !== undefined}
                    value={currentPosition}
                  />
                    I still work here.
                </label>
              </div>
            </div> */}
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
              <div className = "column is-half">
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
                      // disabled: true
                    }}
                  />
                  </div>
                </div>
                <p className = "is-size-7 has-text-danger">Leave blank if current position</p>
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

export default EditExperience;
