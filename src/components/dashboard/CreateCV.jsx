/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;



const CreateCV = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('')
  const [avatarURL, setAvatarURL] = useState('');
  const [bio, setBio] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [email, setEmail] = useState('');
  const [experienceList, setExperienceList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [gitHubURL, setGitHubURL] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [headline, setHeadline] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);



  const { user } = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const fetchUserDetails = async () => {
    setFetchingData(true);
    try {
      const response = await axios.get(`${API_URL}api/cv/portfolios/${uniqueIdentifier}`);
      console.log(response);
      const data = response.data.portfolio[0];
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email)
      setEducationList(data.educations);
      setBio(data.bio);
      setExperienceList(data.experiences);
      setProjectList(data.projects);
      setPhone(data.phone);
      setGitHubURL(data.gitHubURL);
      setLinkedInURL(data.linkedInURL);
      setHeadline(data.headline);
      setAvatarURL(data.avatarURL);
      setFetchingData(false);
      setSuccessMessage(response.data.message)
    }catch(error){
      console.log(error)
      setFetchingData(false);
      setErrorMessage(error.response.data.message)
    }
  }



  console.log(successMessage);
  return (
    <div className = "container">
      <h1 className = "title is-size-5 has-text-centered mb-5">Create Curriculum Vitae</h1>
      {/* <p className = "is-size-5 has-text-centered mb-5">Please provide the needed details</p> */}
      <hr />


    </div>
  )
}

export default CreateCV
