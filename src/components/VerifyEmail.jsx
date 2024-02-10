/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  // console.log(user)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
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
              setIsLoading(false);
              updateUser(response.data);
              navigate('/login');
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


  console.log(user)
  return (
    <div>
      <h1>Verify Email</h1>
    </div>
  )
}

export default VerifyEmail
