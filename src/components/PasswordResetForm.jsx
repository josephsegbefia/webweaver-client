/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const PasswordResetForm = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const passwordResetToken = searchParams.get('passwordResetToken');

  const checkFields = () => {
    if(!password || passwordConfirm || password !== passwordConfirm){
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

  const onFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)

    const requestBody = { passwordResetToken, password };

     axios
      .post(`${API_URL}auth/password-reset`, requestBody)
      .then((response) => {
        setIsLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
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
