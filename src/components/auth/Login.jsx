/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;


import React from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [reload, setReload] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();


  const { storeToken, authenticateUser, user } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const checkFields = () => {
    if(email === '' || password === ''){
      return true;
    }
    false;
  }
  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }

  useEffect(() => {
    // Empty
  }, [reload]);


  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const requestBody = { email, password };

    axios.post(`${API_URL}auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        setIsLoading(false);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
        .catch((error) => {
          setIsLoading(false);
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
  }

  return (
    <div className = "container mt-6">
    <div className="LoginPage">
      <h1 className = 'has-text-centered is-size-3 has-text-primary'>Login</h1>
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
        </div>
      </div>
      <form onSubmit={handleLoginSubmit}>
        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <div className = 'my-6'>
                {
                  isLoading && (
                    <progress className = 'progress is-medium is-link' max = '100'>
                      60%
                    </progress>
                  )
                }
              </div>
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
          <div className = "column is-half is-offset-one-quarter">
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
        </div>

        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <p className="control">
              <button className="button is-success"
               disabled = {checkFields()}
              >
                Log In</button>
            </p>
          </div>
        </div>

        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <p>Don't have an account yet?</p>
            <p>Can't remember your password? Reset it <Link to = {'/forgot-password'}>here</Link></p>
            <Link to={"/signup"}> Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
    <hr />
  </div>
  )
}

export default Login
