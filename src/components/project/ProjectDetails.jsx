/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState } from 'react'

const ProjectDetails = ({ onClose, projId, }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);


  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className = "card">
          <div className = "card-content">

          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default ProjectDetails
