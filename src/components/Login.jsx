/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;


import React from 'react'

const Login = () => {
  return (
    <div className = "container mt-6">
    <div className="LoginPage">
      <h1 className = 'has-text-centered is-size-3 has-text-primary'>Login</h1>
      <hr />
      <div className = "columns">
        <div className = "column is-half is-offset-one-quarter">
            {/* {errorMessage && (
              <article className="message is-danger">
                <div className="message-header">
                  <p>Error</p>
                  <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
                </div>
                <div className = "message-body">
                  {errorMessage}
                </div>
              </article>
          )} */}
        </div>
      </div>
      <form>
        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  // value={email}
                  // onChange={handleEmail}
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
                  placeholder="Passord"
                  // value={password}
                  // onChange={handlePassword}
                />
              </p>
            </div>
          </div>
        </div>

        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
            <p className="control">
              {/* <button className="button is-success"
               disabled = {checkFields()}
              >
                Sign Up</button> */}
            </p>
          </div>
        </div>

        <div className = "columns">
          <div className = "column is-one-quarter is-offset-one-quarter">
            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
          </div>
        </div>
      </form>
    </div>
    <hr />
  </div>
  )
}

export default Login
