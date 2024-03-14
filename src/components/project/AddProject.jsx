/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const AddProject = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Add Project</h1>
          <form onSubmit = {handleSubmit}>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Project Title"
                      // value={lastName}
                      // onChange={handleLastName}
                    />
                  </p>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Techs used e.g React"
                      // value={lastName}
                      // onChange={handleLastName}
                    />
                  </p>
                </div>
              </div>
              <div className="column">
                <button className="button is-success">Add</button>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Provide a short description"
                      // value={lastName}
                      // onChange={handleLastName}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <p className="control">
                    <textarea
                      className="textarea"
                      placeholder="Provide a more detailed description"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className = "columns">
              <div className = "column is-inline-flex">
                <div className = "file">
                  <label className = "file-label">
                    <input className = "file-input" type="file" name="resume" placeholder='upload project image'/>
                    <span className = "file-cta">
                      <span className = "file-icon">
                        <i className = "fas fa-upload"></i>
                      </span>
                      <span className = "file-label">
                        Choose a photo
                      </span>
                    </span>
                  </label>
                </div>
                <button className = "button mx-3">Upload</button>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <button className="button is-success action" type = "submit">Save</button>
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
  );
};

export default AddProject;
