/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  return (
    <div>
      <h1>Verify Email</h1>
    </div>
  )
}

export default VerifyEmail
