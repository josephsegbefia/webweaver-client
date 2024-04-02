/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from "axios";

const CreateMessage = () => {
  const [fullName, setFullName] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [reload, setReload] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;



  // const { user } = useContext(AuthContext);

  const { uniqueIdentifier } = useParams();
  console.log(uniqueIdentifier);
  // user && (uniqueIdentifier = user.uniqueIdentifier);

  const cancel  = () => {
    setFullName("");
    setMessage("");
    setEmailAddress("");
    setMessageSubject("");
  }

  useEffect(() => {
    // Empty
  }, [reload]);

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      senderName: fullName,
      subject: messageSubject,
      senderEmail: emailAddress,
      content: message
    }
    axios.post(`${API_URL}api/portfolios/${uniqueIdentifier}/messages`, requestBody)
      .then((response) => {
        // console.log(response);
        setLoading(false);
        setFullName("");
        setMessage("");
        setEmailAddress("");
        setMessageSubject("");
        setSuccessMessage(`Message sent! ${response.data.message}`)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        setErrorMessage(error.response.data.message)
      })
  }
  return (
    <div className = "container">
      <p className="title is-size-3 my-6 has-text-centered">Shoot me a message</p>
      <hr />
      <div className = "columns">
        <div className="column is-half is-offset-one-quarter">
          {loading && (
            <progress className = 'progress is-medium is-link' max = '100'>
              60%
            </progress>
          )}
          {successMessage && (
            <article className="message is-success">
              <div className="message-header">
                <p>Success</p>
                <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
              </div>
              <div className = "message-body">
                {successMessage}
              </div>
            </article>
          )}
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
            <div className="card">
              <div className="card-content">
                <div className = "columns">
                  <div className = "column">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input message-input has-text-success"
                          type="text"
                          placeholder="Your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className = "columns">
                  <div className = "column">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input message-input has-text-success"
                          type="text"
                          placeholder="Subject of your message"
                          value={messageSubject}
                          onChange={(e) => setMessageSubject(e.target.value)}
                          required
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className = "columns">
                  <div className = "column">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input message-input has-text-success"
                          type="email"
                          placeholder="Email Address"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          required
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className = "columns">
                  <div className = "column">
                    <div className="field">
                      <p className="control">
                        <textarea
                          className="textarea message-input has-text-success"
                          type="text"
                          placeholder="Your message"
                          rows="2"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <footer className = "card-footer">
                <p className="card-footer-item">
                  <span className = "message-icon-cancel" onClick = {cancel}>
                  <i className = "fa-solid fa-xmark"></i>
                  </span>
                </p>
                <p className="card-footer-item">
                  <span>
                  <button type = "submit" className = "submit-button"><i className = "fa-solid fa-paper-plane"></i></button>
                  </span>
                </p>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateMessage
