/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectDetails = ({ onClose, projId, }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);


  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const fetchProject = () => {
    setLoading(true);
    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/projects/${projId}`)
      .then((response) => {
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchProject();
  }, []);

  console.log(projId);
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-content">
          {loading && (
            <progress className = 'progress is-medium is-link' max = '100'>
              60%
            </progress>
          )}
          <div className = "card">
            <div className = "card-content">

            </div>

            <div className = "card-footer">
              <p className="card-footer-item" onClick={handleClose}>
                <span>
                  <i className="fa-solid fa-backward-step"></i>
                </span>
              </p>
              <p className="card-footer-item">
                <span>
                  <i className="fa-regular fa-eye"></i>
                </span>
              </p>
              <p className="card-footer-item">
                <span>
                  <i className="fa-brands fa-github"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default ProjectDetails
