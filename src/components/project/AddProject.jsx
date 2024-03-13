/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const AddProject = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  }


  return (
    <div className = {`modal ${isOpen ? 'is-active' : ''}`}>
      <div className = "modal-background" onClick = {handleClose}></div>
      <div className = "modal-content">
        <div className = "box">
          <h1 className = "title">Title</h1>
          <p>Some paragraph</p>
        </div>
      </div>
      <button className = "modal-close is-large" aria-label = "close" onClick={handleClose}></button>
    </div>
  );
};

export default AddProject;
