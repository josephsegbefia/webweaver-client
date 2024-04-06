/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState('');
  const [reload, setReload] = useState(false);


  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const checkFields = () => {
    if(email === '' || firstName === '' || lastName === '' || password === '' || repeatPassword === ''){
      return true
    }
    false
  }

  const checkPasswordFields = () => {
    if(password !== repeatPassword){
      const error = `Password ${password} does not match ${repeatPassword}. Set matching passwords!`
      setErrorMessage(error);
      setPassword('');
      setRepeatPassword('');
      return true;
    }
    return false;
  }

  const reloadPage = () => {
    setReload(true);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
  }

  useEffect(() => {
    // Empty
  }, [reload]);

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    setIsLoading(loading => !loading);
    if(checkPasswordFields()){
      setIsLoading(loading => !loading);
      return;
    }
    const requestBody = { firstName, lastName, email, password };

    axios.post(`${API_URL}auth/signup`, requestBody)
      .then((response) => {
        if(response.status === 201){
          setIsLoading(loading => !loading);
          setSuccessMessage(`A verification email has been sent to the provided email: ${email}`);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('')
          setRepeatPassword('')

        }
      })
        .catch((error) => {
          setIsLoading(loading => !loading)
          const errorDescription = error.response.data.message;
          setSuccessMessage(undefined);
          setErrorMessage(errorDescription);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setRepeatPassword('');
        })
  }



  return (
    <>
      {isLoading && (
        <progress className = 'progress is-medium is-link' max = '100' style={{height: "4px"}}>
          60%
        </progress>
      )}
      {
        !isLoading && (
          <div className = "container mt-6">
        <div className="SignupPage">
          <h1 className = 'has-text-centered is-size-3 has-text-primary'>Sign Up</h1>
          <hr />
          <div className = "columns">
            <div className = "column is-half is-offset-one-quarter">
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
          <form onSubmit={handleSignupSubmit}>
            <div className = "columns">
              <div className = "column is-one-quarter is-offset-one-quarter">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={handleFirstName}
                    />
                  </p>
                </div>
              </div>

              <div className = "column is-one-quarter">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={handleLastName}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className = "columns">
              <div className = "column is-half is-offset-one-quarter">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className = "columns">
              <div className = "column is-one-quarter is-offset-one-quarter">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePassword}
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
                      value={repeatPassword}
                      onChange={handleRepeatPassword}
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
                    Sign Up</button>
                </p>
              </div>
            </div>

            <div className = "columns">
              <div className = "column is-one-quarter is-offset-one-quarter">
                <p className = "mb-3">Already have an account?</p>
                <Link to={"/login"} className = "login-signup-buttons"> Login</Link>
              </div>
            </div>
          </form>
        </div>
        <hr />
      </div>
      )
      }
    </>

  )
}

export default SignUp;
