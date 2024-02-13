/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const PasswordResetForm = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const passwordResetToken = searchParams.get('passwordResetToken');

  const checkFields = () => {
    if(!password || !passwordConfirm ){
      return true;
    }
    return false;
  }

  const checkPasswordFields = () => {
    if(password !== passwordConfirm){
      const error = `Password ${password} does not match ${passwordConfirm}. Set matching passwords!`
      setErrorMessage(error);
      setPassword('');
      setPasswordConfirm('');
      return true;
    }
    return false;
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  }

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }

  useEffect(() => {
    // Empty
  }, [reload]);


  const onFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(loading => !loading);
    if(checkPasswordFields()){
      setIsLoading(loading => !loading);
      return;
    }

    const requestBody = { passwordResetToken, password };

     axios
      .post(`${API_URL}auth/password-reset`, requestBody)
      .then((response) => {
        setIsLoading(false);
        setSuccessMessage(response.data.message)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setErrorMessage(error.response.data)
      })
      setPassword('');
      setPasswordConfirm('');
  }
  return (
    <div className = "container mt-6">
      <div className="LoginPage">
        <h1 className = 'has-text-centered is-size-3 has-text-primary'>Reset Password</h1>
        <hr />
        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            {/* Notification goes here */}
            {
              isLoading && (
                <progress className = 'progress is-medium is-link' max = '100'>
                  60%
                </progress>
              )
            }
            { errorMessage && (
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
            {
              successMessage && (
              <article className="message is-success">
                <div className="message-header">
                  <p>Success</p>
                  <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
                </div>
                <div className = "message-body">
                  {successMessage}
                </div>
              </article>
              )
            }
          </div>
        </div>

        <form onSubmit={onFormSubmit}>
          <div className = "columns">
              <div className = "column is-one-quarter is-offset-one-quarter">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </p>
                </div>
              </div>

              <div className = "column is-one-quarter">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Repeat Password"
                      value={passwordConfirm}
                      onChange={handlePasswordConfirmChange}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className = "columns">
              <div className = "column is-half is-offset-one-quarter">
              { successMessage && (
                  <p className = "control my-3"><Link to = '/login'>Login to your account</Link></p>
                )}
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
    </div>
  )
}

export default PasswordResetForm
