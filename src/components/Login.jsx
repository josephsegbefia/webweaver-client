/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";

const Login = () => {
  return (
    <div className="container mt-6">
      <div className="LoginPage columns">
        <div className="column is-half is-offset-one-quarter auth">
          <h1 className = 'has-text-centered is-size-3 has-text-primary'>Login</h1>
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
          <form >
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

            <div className="field">
              <p className="control">
                <input
                  className="input"
                  // type = {showPassword ? "text" : "password"}
                  placeholder="Password"
                  // value={password}
                  // onChange={handlePassword}
                />
                {/* <button onClick = {handleShowPassword} className = "icon is-small is-right">
                  <FontAwesomeIcon icon = {showPassword ? faEyeSlash : faEye}/>
                </button> */}
              </p>
            </div>

            <p className="control">
              <button className="button is-success">Login</button>
            </p>
          </form>
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
          <p>Don't have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
