/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const DeleteConfirmation = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      {/* <div className="modal-content"> */}
        <article className="message is-warning" style={{"width": "50%"}}>
          <div className="message-header">
            <p>Error</p>
            <button onClick = {onClose} className="delete" aria-label="delete"></button>
          </div>
          <div className = "message-body">
            <p className = "has-text-danger is-size-6 my-5">Are you sure you want delete?</p>
            <div className="columns">
          <div className="column is-half">
            <button className="button action is-success">No</button>
          </div>
          <div className="column is-half">
            <button className="button action is-danger">Yes</button>
          </div>
      `</div>
          </div>
        </article>
      {/* </div> */}
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default DeleteConfirmation
