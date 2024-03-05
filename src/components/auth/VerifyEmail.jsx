/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, {useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const emailToken = searchParams.get('emailToken');

  useEffect(() => {
    let timeOutId;
    (async () => {
      if (user?.isVerified){
        timeOutId = setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        if(emailToken){
          setIsLoading(true);
          axios.post(`${API_URL}auth/verify-email`, { emailToken })
            .then((response) => {
              // setIsLoading(false);
              updateUser(response.data);
              // const successMessageDecription = `Email Verified. Login to begin`
              // setSuccessMessage(successMessageDecription);
              // navigate('/login');
            })
            .catch((error) => {
              const errorDescription = error.response.data.message;
              setErrorMessage(errorDescription);
            })
        }
      }
    })();
    return () => {
      clearTimeout(timeOutId);
    };
  }, [emailToken, navigate, updateUser, user])

  let userId;
  if(user){
    userId = user._id;
  }

  const requestBody = { user: userId,
     headLine: '',
     bio: '',
     phone: '',
     avatarURL: 'www.exampleurl.com',
     gitHubURL: 'www.exampleurl.com',
     linkedInURL: 'www.exampleurl.com',
     location: ''
    };

  useEffect(() => {
    let timeOutId;
    setTimeout(() => {
      axios.post(`${API_URL}api/portfolios`, requestBody)
      .then((response) => {
        setErrorMessage(undefined);
        setIsLoading(false);
        const successMessageDecription = `Email Verified. Login, complete your profile to begin.`
        setSuccessMessage(successMessageDecription);
        console.log(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
    }, 4000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [user]);


  console.log(user)
  return (
    <>
      <div className = "columns">
        <div className = "column is-half is-offset-one-quarter">
        <div>
      {isLoading ? (
        <progress className = 'progress is-medium is-link' max = '100'>
          60%
        </progress>
      ) : (
        <div>
          {user?.isVerified ? (
            <article className="message is-success">
              <div className="message-header">
                <p>Success</p>
                {/* <button onClick = {reloadPage} className="delete" aria-label="delete"></button> */}
              </div>
              <div className = "message-body">
                {successMessage}
              </div>
          </article>
          ) : (
            <div>
              {errorMessage ? (
              <article className="message is-danger">
                <div className="message-header">
                  <p>Error</p>
                  {/* <button onClick = {reloadPage} className="delete" aria-label="delete"></button> */}
                </div>
                <div className = "message-body">
                  {errorMessage}
                </div>
              </article>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>

        </div>
      </div>
    </>
  )
}

export default VerifyEmail
