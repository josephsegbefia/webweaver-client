/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import axios from "axios";

// import '../education/education.css';

const API_URL = import.meta.env.VITE_API_URL;

const AddProject = ({ onClose, setRefresh }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [techsUsed, setTechsUsed] = useState([]);
  const [tech, setTech] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [reload, setReload] = useState(false);

  const { user } = useContext(AuthContext);

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



  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);


  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    const requestBody = {
      title,
      shortDesc,
      description,
      techsUsed,
      imgUrl,
      liveLink,
      gitHubLink
    }

    const storedToken = localStorage.getItem('authToken');

    axios.post(`${API_URL}api/portfolios/${uniqueIdentifier}/projects`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response)
        setTitle('');
        setShortDesc('');
        setDescription('');
        setTechsUsed([]);
        setImgUrl('');
        setGitHubLink('');
        setLiveLink('');
        setRefresh(refresh => !refresh);
        handleClose();
        setSaving(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.log(error);
        setSaving(false);
      })
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-size-4">Add Project</h1>
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
          {
            saving && (
              <progress className = 'progress is-medium is-link' max = '100' style={{height: "4px"}} >
                60%
              </progress>
            )
          }
          <form onSubmit = {handleSubmit}>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
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
                      className="input is-primary"
                      type="text"
                      placeholder="Techs used e.g React"
                      value={tech}
                      onChange={handleTechChange}
                    />
                  </p>
                </div>
              </div>
              <div className="column">
                <button className="button is-success" onClick={addTech} disabled={fieldCheck(tech)} type = "button"> + </button>
              </div>
            </div>
            <div className = "columns">
              <div className = "column">

              </div>
              <div className = "column">
                <p className = "is-size-7 has-text-danger">Please click + button after entering each tech</p>
              </div>
            </div>


            <div className="columns">
              <div className="column">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
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
                      className="textarea is-primary"
                      placeholder="Provide a more detailed description"
                      onChange = {(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Provide link to view the app live."
                      value={liveLink}
                      onChange={(e) => setLiveLink(e.target.value)}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Provide a link to the project's github repo"
                      value={gitHubLink}
                      onChange={(e) => setGitHubLink(e.target.value)}
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
                    <input className = "file-input is-primary" type="file" name="resume" placeholder='upload project image' onChange={handleImgChange}/>
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
            {
              !imgUploading && !imageName && (
                <p className = "is-size-7 has-text-danger my-3">Please click upload button after img file selection</p>
              )
            }

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
                <button className="button is-success action"  type = "submit">Save</button>

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

export default AddProject;
