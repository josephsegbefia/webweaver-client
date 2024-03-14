/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AddProject = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [techsUsed, setTechsUsed] = useState([]);
  const [tech, setTech] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);



  const checkFormFields = () => {
    if(title ===  "" || description === "" || shortDesc === "" || techsUsed < 0 ){
      setErrorMessage("Please fill all fields. Thank you!")
      return false;
    }
    true;
  }

  const fieldCheck = (field) => {
    if(field === ''){
      return true;
    }
    false;
  }

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const handleTechChange = (e) => {
    setTech(e.target.value);
  }

  const addTech = () => {
    const techToSave = tech.trim();
    setTechsUsed([techToSave, ...techsUsed]);
    setTech('');
  }

  const removeTech = (indexToRemove) => {
    const updatedTechs = techsUsed.filter((_, index) => index !== indexToRemove);
    setTechsUsed(updatedTechs);
  }

  const uploadImage = () => {
    if (!selectedFile){
      console.log('No file selected');
      return;
    }
    setImgUploading(true);

    const uploadData = new FormData();
    uploadData.append('imgUrl', selectedFile);
    axios.post(`${API_URL}api/image-upload`, uploadData)
      .then((response) => {
        setImgUrl(response.data.fileUrl)
        setImgUploading(false);
      })
      .catch((error) => {
        console.log('Error uploading the file');
        setImgUploading(false);
      })
  }

  const handleImgChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageName(event.target.files[0].name)
  }


  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    checkFormFields();

    const requestBody = {
      title,
      shortDesc,
      description,
      imgUrl,
      techsUsed
    }

    const storedToken = localStorage.getItem('authToken');

    axios.post(`${API_URL}api/portfolios/${uniqueIdentifier}/projects`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response.data)
        setTitle('');
        setShortDesc('');
        setDescription('');
        setImgUrl('');
        setImageName('');
        setTechsUsed([]);
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
          <h1 className="title">Add Project</h1>
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
          <form onSubmit = {handleSubmit}>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Project Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={tech}
                      onChange={handleTechChange}
                    />
                  </p>
                </div>
              </div>
              <div className="column">
                <button className="button is-success" onClick={addTech} disabled={fieldCheck(tech)} type = "button">Add</button>
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
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
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
                      onChange = {(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className = "columns">
              <div className = "column">
                <p>Technologies used:</p>
              {techsUsed.length > 0 && techsUsed.map((tech, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-success mr-3'>{tech} <i className="fa-solid fa-xmark ml-3" onClick={() => removeTech(index)}></i></span>
                    </div>
                  )
              })}

              </div>
            </div>
            <div className = "columns">
              <div className = "column is-inline-flex">
                <div className = "file">
                  <label className = "file-label">
                    <input className = "file-input" type="file" name="resume" placeholder='upload project image' onChange={handleImgChange}/>
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
                <button className = "button mx-3" onClick={uploadImage} type = "button">Upload</button>
              </div>
            </div>
            {imgUploading && (
              <div className = "columns">
                <div className = "column">
                  <small className = "is-success">Uploading image please wait...</small>
                </div>
              </div>
            )}
            {imageName && (
              <div className = "columns">
                <div className = "column">
                  <small className = "is-success is-size-7">{imageName}</small>
                </div>
              </div>
            )}

            <div className="columns">
              <div className="column">
                <button className="button is-success action" disabled = {imageName === ""} type = "submit">Save</button>
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
