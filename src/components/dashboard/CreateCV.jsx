/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;



const CreateCV = () => {
  // User Details
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
  const [dataFetched, setDataFetched] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  // const [ready, setReady] = useState(false);

  // Job Details
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');



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
      setDataFetched(true);
      setSuccessMessage(response.data.message)
    }catch(error){
      console.log(error)
      setFetchingData(false);
      setErrorMessage(error.response.data.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchUserDetails()
  }

  return (
    <div className = "container">
      <h1 className = "title is-size-5 has-text-centered mb-3">Create Curriculum Vitae</h1>
      <p className = "is-size-6 has-text-centered mb-2">Here we help tailor a cv to fit a job</p>
      <hr />


      <form onSubmit={handleSubmit}>
      {fetchingData && (
          <>
            <p className = "has-text-primary is-size-7 has-text-centered my-4">Fetching user portfolio details...</p>
            <progress className = 'progress is-medium is-link' max = '100' style={{height: "4px"}}>
              60%
            </progress>
          </>
        )}

        <div className = "columns">
          <div className = "column">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Position you are applying to"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className = "columns">
          <div className = "column">
            <textarea
              className = "textarea"
              placeholder = "Paste job description here"
              value = {jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>
        {!dataFetched && (
          <div className = "columns">
            <div className = "column">
              <button className = "button is-primary" type = "submit">Go</button>
            </div>
          </div>
        )}
      </form>

      {dataFetched && (
        <form>
          <p className = "title is-size-5 has-text-centered mt-5 mb-3">Data to be used to build CV</p>
          <p className = "has-text-centered is-size-6 mb-5">You can edit the sections not greyed out</p>
          <div className = "columns">
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input is-small"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  // onChange={(e) => setCompanyName(e.target.value)}
                  disabled = {true}
                />
              </p>
            </div>
          </div>
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input is-small"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  // onChange={(e) => setPosition(e.target.value)}
                  disabled = {true}
                />
              </p>
            </div>
          </div>
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input is-small"
                  type="text"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className = "columns">
          <div className = "column">
            <div className = "field">
              <p className = "control">
                <input
                  className = "input is-small"
                  type = "text"
                  placeholder="github link"
                  value = {gitHubURL}
                  disabled = {true}
                />
              </p>
            </div>
          </div>
          <div className = "column">
            <div className = "field">
              <p className = "control">
                <input
                  className = "input is-small"
                  type = "text"
                  placeholder="linked link"
                  value = {linkedInURL}
                  disabled = {true}
                />
              </p>
            </div>
          </div>
          <div className = "column">
            <div className = "field">
              <p className = "control">
                <input
                  className = "input is-small"
                  type = "text"
                  placeholder="email"
                  value = {email}
                  onChange = {(e) => e.target.value}
                />
              </p>
            </div>
          </div>
        </div>
        <div className  = "columns">
          <div className = "column">
            <div className = "field">
              <p className = "control">
                <textarea
                  className = "textarea is-small"
                  type = "text"
                  placeholder="email"
                  value = {bio}
                  onChange = {(e) => e.target.value}
                />
              </p>
            </div>
          </div>
        </div>
        <div className = "columns">
            <div className = "column">
              <button className = "button is-primary is-small" type = "submit">Create CV</button>
            </div>
          </div>
        </form>
      )}

    </div>
  )
}

export default CreateCV
