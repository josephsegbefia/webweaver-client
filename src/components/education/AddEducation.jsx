/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import axios from "axios";
 import '../education/education.css';

const API_URL = import.meta.env.VITE_API_URL;

const AddEducation = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);


  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title">Add Education</h1>
          {/* {errorMessage && (
            <article className="message is-danger">
              <div className="message-header">
                <p>Error</p>
                <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
              </div>
              <div className = "message-body">
                {errorMessage}
              </div>
            </article>
          )} */}
          <form>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Project Title"
                      // value={title}
                      // onChange={(e) => setTitle(e.target.value)}
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
                      // value={tech}
                      // onChange={handleTechChange}
                    />
                  </p>
                </div>
              </div>
              <div className="column">
                {/* <button className="button is-success" onClick={addTech} disabled={fieldCheck(tech)} type = "button">Add</button> */}
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
                      // value={shortDesc}
                      // onChange={(e) => setShortDesc(e.target.value)}
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
                      // onChange = {(e) => setDescription(e.target.value)}
                      // value={description}
                    />
                  </p>
                </div>
              </div>
            </div>
            {/* {imgUploading && (
              <div className = "columns">
                <div className = "column">
                  <small className = "is-success">Uploading image please wait...</small>
                </div>
              </div>
            )} */}
            {/* {imageName && (
              <div className = "columns">
                <div className = "column">
                  <small className = "is-success is-size-7">{imageName}</small>
                </div>
              </div>
            )} */}

            <div className="columns">
              <div className="column">
                {/* <button className="button is-success action" disabled = {imageName === ""} type = "submit">Save</button> */}
                {/* {
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
                      <button className = "button is-success action" value = "Save" type = "submit" disabled = {imageName === ""}>Save</button>
                    )
                  }[saveStatus]
                } */}
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
