/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles.scss'
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;

const EditUserPortfolio = ({setEditMode}) => {
  const [headLine, setHeadLine] = useState('');
  const [interests, setInterests] = useState([]);
  const [interest, setInterest] = useState('');
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState('');
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState('');
  const [imageName, setImageName] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [gitHubURL, setGitHubURL] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  // const [langFieldActive, setLangFieldActive] = useState(false);
  const [committed, setCommitted] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('')

  const { user, isLoggedIn } = useContext(AuthContext);



  const fieldCheck = (field) => {
    if(field === ''){
      return true;
    }
    false;
  }

  // let uniqueIdentifier;

  const {uniqueIdentifier} = useParams();


  const uploadImage = () => {
    if (!selectedFile){
      console.log('No file selected');
      return;
    }
    setImgUploading(loading => !loading);

    const uploadData = new FormData();
    uploadData.append('imgUrl', selectedFile);
    axios.post(`${API_URL}api/image-upload`, uploadData)
      .then((response) => {
        setAvatarURL(response.data.fileUrl)
        setImgUploading(loading => !loading);
      })
      .catch((error) => {
        console.log('Error uploading the file');
      })
  }

  const addSkill = () => {
    const skillToSave = skill;
    setSkills([skillToSave, ...skills]);
    setSkill('');
  }

  const addInterest = () => {
    const interestToSave = interest;
    setInterests([interestToSave, ...interests]);
    setInterest('');
  };


  const addLanguage = () => {
    const languageToSave = language;
    setLanguages([languageToSave, ...languages]);
    setLanguage('');
  }

  const handleBioChange = (e) => {
    setBio(e.target.value);
  }

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const handleAvatarChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageName(event.target.files[0].name)
  }

  const handleHeadLineChange = (e) => {
    setHeadLine(e.target.value);
  }

  const handleLinkedInURLChange = (e) => {
    setLinkedInURL(e.target.value);
  }

  const handleGitHubURLChange = (e) => {
    setGitHubURL(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const handleInterestChange = (e) => {
    setInterest(e.target.value)
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const removeSkill = (indexToRemove) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToRemove);
    setSkills(updatedSkills);
  }

  const removeInterest = (indexToRemove) => {
    const updatedInterests = interests.filter((_, index) => index !== indexToRemove);
    setInterests(updatedInterests);
  }

  const removeLanguage = (indexToRemove) => {
    const updatedLanguages = languages.filter((_, index) => index !== indexToRemove);
    setLanguages(updatedLanguages);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      user: owner,
      headLine, interests,
      languages, skills,
      phone, avatarURL,
      linkedInURL, gitHubURL,
      bio, location
    }


    axios.put(`${API_URL}api/portfolios/${uniqueIdentifier}`, requestBody)
    .then((response) => {
      console.log(response.data)
      setLoading(false);
      setEditMode(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })

  }



  useEffect(() => {
    if(user){
      console.log(user);
      axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}`)
        .then((response) => {
          console.log(response.data[0]);
          setHeadLine(response.data[0].headLine);
          setLastName(response.data[0].lastName);
          setFirstName(response.data[0].firstName);
          setBio(response.data[0].bio);
          setEmail(response.data[0].email)
          setOwner(response.data[0].user);
          setSkills(response.data[0].skills);
          setLanguages(response.data[0].languages);
          setInterests(response.data[0].interests);
          setPhone(response.data[0].phone);
          setGitHubURL(response.data[0].gitHubURL);
          setLinkedInURL(response.data[0].linkedInURL);
          setLocation(response.data[0].location);
          setAvatarURL(response.data[0].avatarURL);
        })
    }
  }, [uniqueIdentifier, user]);


  console.log(headLine);

  return (
    <div className = "container">
      {
        loading && (
          <progress className = "progress is-medium is-link' max = '100" style={{height: "4px"}}>
            60%
          </progress>
        )
      }
      <h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1>
      <form onSubmit={handleSubmit}>
        <div className = "tile is-ancestor mt-6">
          <div className ="tile is-4 is-vertical is-parent">
            <div className = "tile is-child box">
              {imgUploading && (
                <progress className = 'progress slim is-medium is-link' max = '100' style={{height: "4px"}}>
                  60%
                </progress>
              )}
              {avatarURL ? (
                <figure className = 'image is-128x128' style={{margin: "0 auto", borderRadius: "50%"}}>
                  <img className = 'is-rounded' src = {avatarURL} alt = 'avatar image' style={{height: "128px", width: "128px"}}/>
                </figure>
              ) : (
                <div>
                  <p className = "title is-size-5">Upload a profile photo</p>
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
              <p className = "is-size-7 has-text-danger mt-3">Please click upload image to upload your picture!</p>
              {imageName && (
                <p>{imageName}</p>
              )}
              <button type = "button" className = 'button is-primary is-light is-small mt-4' onClick={uploadImage} disabled={imgUploading}>Upload Image</button>
                </div>
              )}

              <hr />

              <input
                type = 'text'
                className = 'input is-primary'
                value = {headLine}
                onChange = {handleHeadLineChange}
                placeholder='Position e.g Junior Full Stack Developer'
              />
            </div>

            <div className = "tile is-child box">
              <p className = "title is-size-5">Skills</p>
              <div className = 'is-inline-flex'>
                <input
                  type =  "text"
                  name = 'skills'
                  placeholder = 'Add skills'
                  className = 'input is-primary'
                  value = {skill}
                  onChange={handleSkillChange}
                />
                <button className = 'button is-primary add-button' disabled={fieldCheck(skill)} onClick={addSkill}>+</button>
              </div>
              <div>
                {skills && skills.map((skill, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-success mr-3'>{skill} <i className="fa-solid fa-xmark ml-3" onClick={() => removeSkill(index)}></i></span>
                    </div>
                  )
                })}
              </div>

              <hr />
              <p className = 'title is-size-5'>Info</p>
              <p className = "is-size-7"><span><i className = 'fas fa-envelope mr-3 mb-3'></i>{email}</span></p>
              <input type="text"
                className = 'input is-size-7 is-primary'
                placeholder='phone'
                value={phone}
                onChange={handlePhoneChange}
              />
              <input type="text"
                className = 'input mt-3 is-size-7 is-primary'
                placeholder = 'LinkedIn url'
                value = {linkedInURL}
                onChange = {handleLinkedInURLChange}
              />
              <input type="text"
                className = 'input mt-3 is-size-7 is-primary'
                placeholder = 'GitHub url'
                value = {gitHubURL}
                onChange = {handleGitHubURLChange}
              />
              <input type="text"
                className = 'input mt-3 is-size-7 is-primary'
                placeholder = 'location e.g Accra, Ghana'
                value = {location}
                onChange = {handleLocationChange}
              />
            </div>

          </div>

          <div className = "tile is-parent">
            <div className = "tile is-child box">
              <p className = "title is-size-5">About me</p>
              <textarea
                name="about-me"
                style={{width: "100%", resize: "none"}}
                className = 'textarea is-primary'
                value = {bio}
                onChange = {handleBioChange}
              />
              <div className = 'is-inline-flex'>
                <input
                  type =  "text is-primary"
                  name = 'interest'
                  placeholder = 'Add interests'
                  className = 'input my-3 is-primary'
                  value = {interest}
                  onChange={handleInterestChange}
                />
                <button type = "button" className = 'button is-primary add-button mt-3' disabled={fieldCheck(interest)} onClick={addInterest}>+</button>

                <input
                  type =  "text is-primary"
                  name = 'languages'
                  placeholder = 'Add spoken languages'
                  className = 'input mt-3 ml-3 is-primary'
                  value = {language}
                  onChange={handleLanguageChange}
                />
                <button type = "button" className = 'button is-primary add-button mt-3' disabled={fieldCheck(language)} onClick={addLanguage}>+</button>
              </div>
              <p className = "title is-size-5">Interests</p>
              <div>
                {interests && interests.map((interest, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-primary is-light mr-3'>{interest} <i className="fa-solid fa-xmark ml-3" onClick={() => removeInterest(index)}></i></span>
                    </div>
                  )
                })}
              </div>
              <p className = "title is-size-5 mt-5">Spoken Languages</p>
              <div>
                {languages && languages.map((language, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-primary is-light mr-3'>{language} <i className="fa-solid fa-xmark ml-3" onClick={() => removeLanguage(index)}></i></span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className = "columns">

        </div>
        <div className = "columns">
          <div className = "column is-half">
            <button type='submit' className='button action is-primary my-3'>
              Save
            </button>
          </div>
          <div className = "column is-half">
            <button type = "button" className = "button action my-3 is-half is-danger" onClick = {() => setEditMode(false)}>Cancel</button>
          </div>
        </div>

      </form>

    </div>
  )
}

export default EditUserPortfolio;
