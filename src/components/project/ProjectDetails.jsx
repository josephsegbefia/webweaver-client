/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectDetails = ({ onClose, projId, }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("")
  const [createdAt, setCreatedAt] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [techsUsed, setTechsUsed] = useState([]);
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const { user } = useContext(AuthContext);





  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  // let uniqueIdentifier;
  // user && (uniqueIdentifier = user.uniqueIdentifier);
  const {uniqueIdentifier} = useParams();

  // const visitLink = (link) => {
  //   window.location.href = link;
  // }
  const fetchProject = () => {
    setLoading(true);
    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/projects/${projId}`)
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        setTitle(data.title)
        setCreatedAt(data.createdAt);
        setShortDesc(data.shortDesc);
        setTechsUsed(data.techsUsed);
        setDescription(data.description);
        setLiveLink(data.liveLink)
        setGitHubLink(data.gitHubLink)
        setImgUrl(data.imgUrl)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchProject();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-content">
          {loading && (
            <progress className = 'progress is-medium is-link' max = '100' style={{height: "4px"}}>
              60%
            </progress>
          )}

          <div className = "card">
            <div className ="card-image">
              <figure className = "image is-4by3">
                {imgUrl ? (
                  <img
                    src = {imgUrl}
                    alt ="project image"
                  />
                ): (
                  <img
                    src = "https://bulma.io/assets/images/placeholders/1280x960.png"
                    alt = "placeholder image"
                  />
                )}

              </figure>
            </div>
            <div className = "card-content">
              <p className = "title is-size-5">{title}</p>
              <hr />
              <p className = "subtitle is-size-6">{shortDesc}</p>
              <p className = "is-size-7 has-text-success my-2">{formatDate(createdAt)}</p>
              <p className = "is-size-6">App powered by:</p>
              {techsUsed.map((tech, index) => (
                  <div key={index} className="is-inline-flex">
                    <span className="tag is-success is-light mr-3">{tech}</span>
                  </div>
                ))}
              <p className = "is-size-7 mt-5">{description}</p>
            </div>

            <div className = "card-footer">
              <p className="card-footer-item" onClick={handleClose}>
                <span>
                  <i className="fa-solid fa-backward-step"></i>
                </span>
              </p>
                <p className="card-footer-item">
                  <a href= {liveLink} target="_blank" rel="noopener noreferrer">
                    <span>
                      <i className="fa-regular fa-eye"></i>
                    </span>
                  </a>
                </p>
              <p className="card-footer-item">
                <a href = {gitHubLink} target = "_blank" rel = "noopener noreferrer">
                  <span>
                    <i className="fa-brands fa-github"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default ProjectDetails
