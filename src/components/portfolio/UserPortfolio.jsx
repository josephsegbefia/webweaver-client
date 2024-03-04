/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;

const UserPortfolio = () => {
  const [headLine, setHeadLine] = useState('');
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [gitHubURL, setGitHubURL] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState(null);

  const { user, isLoggedIn } = useContext(AuthContext);

  const {uniqueIdentifier} = useParams();

  useEffect(() => {
    if(user){
      axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}`)
        .then((response) => {
          console.log(response.data[0])
        })
        .catch((error) => {
          console.log(error)
        })
    }

  })
  return (
    <div>
      <h1>Welcome to your portfolio</h1>
    </div>
  )
}

export default UserPortfolio
