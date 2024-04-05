/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const DeleteConfirmation = ({ projectId, setShowDeleteNotification, projectTitle, reload }) => {
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const handleClose = () => {
    setShowDeleteNotification(false);
  };

  const storedToken = localStorage.getItem('authToken');

  const handleDelete = () => {
    setDeleting(true);
    axios.delete(`${API_URL}api/portfolios/${uniqueIdentifier}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then((response) => {
        console.log(response);
        setSuccessMessage(response.data.message);
        reload(true);
        setDeleting(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="container">
      {deleting && (
        <div className="columns is-vcentered">
          <div className="column">
            <progress className="progress is-medium is-link" max="100" style={{height: "4px"}}>
              60%
            </progress>
          </div>
        </div>
      )}
      {errorMessage && !deleting && !successMessage && (
        <div className="columns is-vcentered">
          <div className="column">
            <article className="message is-danger">
              <div className="message-header">
                <p>Error</p>
                <button onClick={handleClose} className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">
                {errorMessage}
              </div>
            </article>
          </div>
        </div>
      )}
      {successMessage && !deleting && !errorMessage && (
        <div className="columns is-vcentered">
          <div className="column">
            <article className="message is-success">
              <div className="message-header">
                <p>Success</p>
                <button onClick={handleClose} className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">
                {successMessage}
              </div>
            </article>
          </div>
        </div>
      )}
      {!deleting && !errorMessage && !successMessage && (
        <div className="columns is-vcentered">
          <div className="column">
            <article className="message is-danger">
              <div className="message-header">
                <p>Confirm deletion</p>
                <button onClick={handleClose} className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">
                <p className="my-4">Are you sure you want to delete {projectTitle} from your portfolio?</p>
                <div className="columns">
                  <div className="column is-half">
                    <button className="button action is-primary" onClick={handleClose}>No</button>
                  </div>
                  <div className="column is-half">
                    <button className="button action is-danger" onClick={handleDelete}>Yes, delete</button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmation;
