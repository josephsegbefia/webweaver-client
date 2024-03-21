/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const CreateMessage = () => {
  const [fullName, setFullName] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      senderName: fullName,
      subject: messageSubject,
      senderEmail: emailAddress,
      content: message
    }
  }
  return (
    <div className = "container">
      <p className="title is-size-3 my-6 has-text-centered">Shoot me a message</p>
      <hr />
      <div className = "columns">
        <div className="column is-half is-offset-one-quarter">
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
                  <span className = "message-icon-cancel">
                  <i className = "fa-solid fa-xmark"></i>
                  </span>
                </p>
                <p className="card-footer-item">
                  <span className = "message-icon">
                  <i className = "fa-solid fa-paper-plane"></i>
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
