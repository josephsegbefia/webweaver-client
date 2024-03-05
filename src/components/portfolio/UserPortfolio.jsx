/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';



const fakeSkills = [
  'React', 'HTML', 'JavaScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'CSS', 'TypeScript', 'Python', 'Git'
]


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
          setHeadLine(response.data[0].headLine);
          setInterests(response.data[0].interests);
          setLanguages(response.data[0].languages);
          setSkills(response.data[0].skills);
          setPhone(response.data[0].phone);
          setEmail(response.data[0].email);
          setAvatarURL(response.data[0].avatarURL);
          setLinkedInURL(response.data[0].linkedInURL);
          setGitHubURL(response.data[0].gitHubURL);
          setBio(response.data[0].bio);
          setLocation(response.data[0].location);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },[uniqueIdentifier, user])

  console.log(avatarURL)
  return (
    <div className = "container">
      <h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1>
        <div className = "tile is-ancestor mt-6">
          <div className ="tile is-4 is-vertical is-parent">
            <div className = "tile is-child box has-text-centered">
              {!avatarURL === 'www.exampleurl.com' ? (
                <figure className = 'image is-128x128'>
                  <img className = 'is-rounded' src = {avatarURL} alt = 'avatar image' />
                </figure>
              ) : (
                <div>
                  <i className = "fa-regular fa-user fa-2xl"></i>
                </div>
              )}
              <hr />
              <h1 className = 'has-text-centered is-size-4 mt-3 has-text-primary'>{headLine ? headLine : 'Full Stack Web Developer'}</h1>
            </div>

            <div className = "tile is-child box">
              <p className = "title">Skills</p>
              <div>
                {fakeSkills.map((skill, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-success mr-3'>{skill} <i className="fa-solid fa-xmark ml-3"></i></span>
                    </div>
                  )
                })}
              </div>

              <hr />
              <p className = 'title'>Info</p>
              <p><span><i className = 'fas fa-envelope mr-3 mb-3'></i></span>{email}</p>
              <p><span><i className = 'fas fa-phone mr-3 mb-3'></i></span>+491636966417</p>
              <p><span><i className = "fa-brands fa-linkedin mr-3 mb-3"></i></span>{linkedInURL}</p>
              <p><span><i className = "fa-brands fa-github mr-3 mb-3"></i></span>{gitHubURL}</p>
              <p><span><i className = "fa-solid fa-location-pin mr-3 mb-3"></i></span>Accra, Ghana</p>
              <input type="text"
                className = 'input mt-3'
                placeholder = 'location e.g Accra, Ghana'
                value = {location}
                // onChange = {handleLocationChange}
              />
            </div>

          </div>

          <div className = "tile is-parent">
            <div className = "tile is-child box">
              <p className = "title">About me</p>
              <textarea
                name="about-me"
                style={{width: "100%", resize: "none"}}
                className = 'textarea'
                value = {bio}
                // onChange = {handleBioChange}
              />
              <div className = 'is-inline-flex'>
                <input
                  type =  "text"
                  name = 'interest'
                  placeholder = 'Add interests'
                  className = 'input my-3'
                  // value = {interest}
                  // onChange={handleInterestChange}
                />
                <button className = 'button is-primary add-button mt-3'>+</button>

                <input
                  type =  "text"
                  name = 'languages'
                  placeholder = 'Add spoken languages'
                  className = 'input mt-3 ml-3'
                  // value = {language}
                  // onChange={handleLanguageChange}
                />
                <button className = 'button is-primary add-button mt-3'>+</button>
              </div>
              <p className = "is-size-5">Interests</p>
              <div>
                {interests && interests.map((interest, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      {/* <span className = 'tag is-primary is-light mr-3'>{interest} <i className="fa-solid fa-xmark ml-3" onClick={() => removeInterest(index)}></i></span> */}
                    </div>
                  )
                })}
              </div>
              <p className = "is-size-5 mt-5">Spoken Languages</p>
              <div>
                {languages && languages.map((language, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      {/* <span className = 'tag is-primary is-light mr-3'>{language} <i className="fa-solid fa-xmark ml-3" ></i></span> */}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='button is-primary'>
          Save
        </button>
    </div>
  )
}

export default UserPortfolio
