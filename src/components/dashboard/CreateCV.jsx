/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;



const CreateCV = () => {
  const [avatarURL, setAvatarURL] = useState('');
  const [bio, setBio] = useState('');
  const [educationList, setEducationList] = useState([]);

  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  useEffect(() => {
    axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <div>
      <h1>Create CV</h1>


    </div>
  )
}

export default CreateCV
