/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPasswordForm = () => {

  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [reload, setReload] = useState(false);

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }

  useEffect(() => {
    // Empty
  }, [reload]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const checkFields = () => {
    if(!email){
      return true;
    }
    return false;
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const requestBody = { email };

    axios.post(`${API_URL}auth/password-reset-email`, requestBody)
      .then((response) => {
        console.log(response.data.message)
        setIsLoading(false);
        setSuccessMessage(response.data.message)
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setSuccess(false)
        setErrorMessage(error.response.data.message)
      })

      setEmail('');
  }
  return (
    <div className = "container mt-6">
      <div className="LoginPage">
        <h1 className = 'has-text-centered is-size-3 has-text-primary'>Reset Password</h1>
        <p className = 'has-text-centered has-text-primary'>Please provide your email to receive the password reset link</p>
        <hr />
      </div>
      <form onSubmit={onFormSubmit}>
        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <div className = 'my-6'>
              {
                isLoading && (
                  <progress className = 'progress is-medium is-link' max = '100' style={{height: "4px"}}>
                    60%
                  </progress>
                )
              }
              {
                success && (
                  <article className="message is-success">
                    <div className="message-header">
                      <p>Success</p>
                      {/* <button onClick = {reloadPage} className="delete" aria-label="delete"></button> */}
                    </div>
                    <div className = "message-body">
                      {successMessage}
                    </div>
                  </article>
                )
              }
              {
                errorMessage && (
                  <article className="message is-danger">
                    <div className="message-header">
                      <p>Error</p>
                      <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
                    </div>
                    <div className = "message-body">
                      {errorMessage}
                    </div>
                  </article>
                )
              }
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input is-primary"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </p>
            </div>
          </div>
        </div>

        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <p className="control">
              <button className="button is-success"
                disabled = {checkFields()}
              >
                Submit</button>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordForm
