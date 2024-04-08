/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const DeleteJobTracking = ({ handleDeleteClose, jobId, setDeleteSuccessful, setDeleteMessage }) => {
  const { user } = useContext(AuthContext)

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);


  const storedToken = localStorage.getItem('authToken');

  const handleDelete = () => {
    axios.delete(`${API_URL}api/portfolios/${uniqueIdentifier}/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then((response) => {
      handleDeleteClose()
      setDeleteMessage(response.data.message);
      setDeleteSuccessful(true);
    })
    .catch((error) => {
      handleDeleteClose()
      setDeleteSuccessful(true);
      setDeleteMessage(error.response.data.message)
    })
  }

  return (
    <div>
      <article className="message is-danger">
        <div className="message-header">
          <p></p>
          <button onClick = {handleDeleteClose} className="delete" aria-label="delete"></button>
        </div>
        <div className = "message-body">
          <p className = "my-3">Are you sure?</p>
          <div className = "buttons">
            <button className = "button has-text-danger is-small" type = "button" onClick={handleDelete}>
              Yes
            </button>
            <button className = "button has-text-success is-small" type = "button" onClick={handleDeleteClose}>
              No
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default DeleteJobTracking
