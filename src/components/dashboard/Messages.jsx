/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import MessageDetails from './MessageDetails';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [read, setRead] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Modal State
  const [messageId,setMessageId] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  // View Message
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const limit = 10

  const nextPage = () => {
    // handleDeleteClose()
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }


  // For modal - Functions
  const handleCloseDetails = () => {
    setDetailsOpen(false);
  }

  const handleOpenDetails = () => {
    setDetailsOpen(true);
  }

  const prevPage = () => {
    // handleDeleteClose();
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const fetchMessages = () => {
    setLoadingMessages(true);
    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/messages?limit=${limit}&offset=${(currentPage - 1) * limit }`)
      .then((response) => {
        console.log(response.data.messages);
        setMessages(response.data.messages);
        setLoadingMessages(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingMessages(false);
      })
  }

  const markAsRead = (messageId) => {

    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/messages/${messageId}`)
  .then((response) => {
    console.log(response.data);
    setRead(true);

    const requestBody = {
      read: true
    };

    return axios.put(`${API_URL}api/portfolios/${uniqueIdentifier}/messages/${messageId}`, requestBody);
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

  }


  // OPEN VIEW MESSAGE MODAL
  const getMessageIdAndOpenViewMessageModal = (id) => {
    handleOpenDetails();
    markAsRead(id);
    setMessageId(id);
  }

  useEffect(() => {
    fetchMessages();
  }, [read, detailsOpen]);

  return (
    <div className = "container">
      <h1>Messages</h1>
      <hr />
      {loadingMessages && (
        <div className="columns is-vcentered">
          <div className="column">
            <progress className='progress is-medium is-link' max='100' style={{height: "4px"}}>
              60%
            </progress>
          </div>
        </div>
      )}
      <table className="table is-fullwidth my-5">
        <thead>
          <tr>
            <th className = 'is-size-7'>Sender Name</th>
            <th className = 'is-size-7'>Sender Email</th>
            <th className = 'is-size-7'>Subject</th>
            <th className = 'is-size-7'>Status</th>
            <th className = 'is-size-7'>Date</th>
            <th className = 'is-size-7 ml-5'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length !== 0 && messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((message) => (
            <tr key={message._id}>
              <td className = {`is-size-7 ${message.read ? '' : 'title'}`}>{message.senderName}</td>
              <td className = {`is-size-7 ${message.read ? '' : 'title'}`}>{message.senderEmail}</td>
              <td className = {`is-size-7 ${message.read ? '' : 'title'}`}>{message.subject}</td>
              <td className = {`is-size-7 ${message.read ? '' : 'title'}`}>{message.read ? "Read" : "Unread"}</td>
              <td className = {`is-size-7 ${message.read ? '' : 'title'}`}>{formatDate(message.createdAt)}</td>
              <td>
                <div className="buttons">
                  <button className="button is-primary is-small" onClick={() => getMessageIdAndOpenViewMessageModal(message._id)}>Read</button>
                  {/* <button className="button is-primary is-small" onClick={() => markAsRead(message._id)}>{!message.read ? "Mark as read":"Mark as unread"}</button> */}
                  <button className="button is-danger is-small" >Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="columns">
          <div className="column is-half">
            <button className="button action is-warning" onClick={prevPage} disabled = {currentPage === 1}>Previous</button>
          </div>
          <div className="column is-half">
            <button className="button action is-primary" onClick={nextPage} disabled = {currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
      {detailsOpen && <MessageDetails onClose = {handleCloseDetails} messageId = {messageId}/>}
    </div>
  )
}

export default Messages
