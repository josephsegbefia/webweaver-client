/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;



const MessageDetails = ({ onClose, messageId }) => {

  const [isOpen, setIsOpen] = useState(true);

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(undefined)
  const [loading, setLoading] = useState(false);

  const {user} = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };


  // Fetch Message
  const fetchMessage = () => {
    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/messages/${messageId}`)
      .then((response) => {
        console.log(response.data);
        setSenderName(response.data.senderName);
        setDate(response.data.createdAt);
        setSenderEmail(response.data.senderEmail);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useState(() => {
    fetchMessage();
  }, [])


  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className = "card">
          {loading && (
            <div className="columns is-vcentered">
              <div className="column">
                <progress className='progress is-medium is-link' max='100' style={{height: "4px"}}>
                  60%
                </progress>
              </div>
            </div>
          )}
          <div className = "card-content">
            <h1 className = "title is-size-6">From: {senderName}</h1>
            <p className = "mb-3">Sender Email: {senderEmail}</p>
            <p className = "is-size-7 has-text-success mb-3"><span className = "has-text-black">Dated: </span>{formatDate(date)}</p>
            <hr />

           <p>{content}</p>
          </div>
          <div className = "card-footer">

            <p className="card-footer-item" onClick={handleClose} style={{backgroundColor: "red", color: "white", fontWeight: "bold"}}>
              Close
            </p>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default MessageDetails
