/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect } from 'react'

const EditJob = ({onClose, jobId}) => {
  const [isOpen, setIsOpen] = useState(true);


  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-size-6">Edit Job - {jobId}</h1>

        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default EditJob
