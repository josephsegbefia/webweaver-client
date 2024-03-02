/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import '../../assets/styles.scss'
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;

const CreatePortfolio = () => {
  const [headLine, setHeadLine] = useState('');
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [gitHubURL, setGitHubURL] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const { user, isLoggedIn } = useContext(AuthContext);



  let uniqueIdentifier;



  const uploadImage = (event) => {

    const uploadData = new FormData();
    uploadData.append('imgUrl', event.target.files[0]);

    axios.post(`${API_URL}api/image-upload`, uploadData)
      .then((response) => {
        setAvatarURL(response.data.fileUrl);
      })
      .catch((error) => {
        console.log('Error uploading the file')
      })

  }

  const addSkill = () => {
    const skillToSave = skill;
    setSkills([skillToSave, ...skills]);
    setSkill('');
  }

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const handlePhoneChange = () => {

  }

  const handleAvatarChange = () => {

  }

  const hamdleHeadLineChange = () => {

  }

  const handleLinkedInURLChange = () => {

  }

  const handleGitHubURLChange = () => {

  }

  const handleLocationChange = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if(user){
      axios.get(`${API_URL}api/portfolios/${user.uniqueIdentifier}`)
        .then((response) => {
          console.log(response.data[0]);
          setHeadLine(response.data[0].headLine);
          setBio(response.data[0].bio);
          setEmail(response.data[0].email)
        })
    }
  }, [user]);
  console.log(skills)


  return (
    <div className = "container">
      <h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1>
      <form onSubmit={handleSubmit}>
        <div className = "tile is-ancestor mt-6">
          <div className ="tile is-4 is-vertical is-parent">
            <div className = "tile is-child box">
              <p className = "title">Upload a profile photo</p>
              <div className = "file">
                <label className = "file-label">
                  <input className = "file-input" type="file" name="resume" onChange = {handleAvatarChange}/>
                  <span className = "file-cta">
                    <span className = "file-icon">
                      <i className = "fas fa-upload"></i>
                    </span>
                    <span className = "file-label">
                      Choose a photo
                    </span>
                  </span>
                </label>
              </div>
              <hr />

              <input type = 'text' className = 'input' value = {headLine} onChange = {hamdleHeadLineChange} />
            </div>

            <div className = "tile is-child box">
              <p className = "title">Skills</p>
              <div className = 'is-inline-flex'>
                <input
                  type =  "text"
                  name = 'skills'
                  placeholder = 'Add skills'
                  className = 'input'
                  value = {skill}
                  onChange={handleSkillChange}
                />
                <button className = 'button is-primary add-button' onClick={addSkill}>+</button>
              </div>
              <div>
                {skills && skills.map((skill, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-success mr-3'>{skill} <i className="fa-solid fa-xmark ml-3"></i></span>
                    </div>
                  )
                })}
              </div>

              <hr />
              <p className = 'title'>Info</p>
              <p><span><i className = 'fas fa-envelope mr-3 mb-3'></i>{email}</span></p>
              <input type="text"
                className = 'input'
                placeholder='phone'
                value={phone}
                onChange={handlePhoneChange}
              />
              <input type="text"
                className = 'input mt-3'
                placeholder = 'LinkedIn url'
                value = {linkedInURL}
                onChange = {handleLinkedInURLChange}
              />
              <input type="text"
                className = 'input mt-3'
                placeholder = 'GitHub url'
                value = {gitHubURL}
                onChange = {handleGitHubURLChange}
              />
              <input type="text"
                className = 'input mt-3'
                placeholder = 'location e.g Accra, Ghana'
                value = {location}
                onChange = {handleLocationChange}
              />
            </div>

          </div>

          <div className = "tile is-parent">
            <div className = "tile is-child box">
              <p className = "title">About me</p>
              <textarea
                name="" id=""
                style={{width: "100%", resize: "none"}}
                className = 'textarea'
                value = {bio}
              />
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default CreatePortfolio
