/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className = "container">
      <div className="SignupPage">
        <h1 className = 'has-text-centered is-size-3 has-text-primary'>Sign Up</h1>
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
            <div className = "column is-one-quarter is-offset-one-quarter">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="First name"
                    // value={firstName}
                    // onChange={handleFirstName}
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
                    // value={lastName}
                    // onChange={handleLastName}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className = "columns">
            <div className = "column is-half is-offset-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
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
            <div className = "column is-one-quarter is-offset-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
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

            <div className = "column is-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="password"
                    placeholder="Repeat Password"
                    // value={repeatPassword}
                    // onChange={handleRepeatPassword}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className = "columns">
            <div className = "column is-half is-offset-one-quarter">
              <p className="control">
                <button className="button is-success"
                //  disabled = {checkFields()}
                >
                  Sign Up</button>
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
    </div>
  )
}

export default SignUp;
