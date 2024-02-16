/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;

const CreatePortfolio = () => {
  const [headLine, setHeadLine] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [gitHubURL, setGitHubURL] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');


  const uploadImage = (event) => {

    const uploadData = new FormData();
    uploadData.append('imgUrl', event.target.files[0]);

    axios.post(`${API_URL}api/image-upload`, uploadData)
      .then((response) => {
        setAvatarURL(response.fileUrl);
      })
      .catch((error) => {
        console.log('Error uploading the file')
      })

  }

  useEffect(() => {

  })
  return (
    <div>

    </div>
  )
}

export default CreatePortfolio
