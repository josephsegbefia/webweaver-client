/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';



// const fakeSkills = [
//   'React', 'HTML', 'JavaScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'CSS', 'TypeScript', 'Python', 'Git'
// ];

// const fakeInterests = [
//   'Open Source Contributions', 'Technology Exploration', 'Problem Solving', 'User Experience (UX) Design',
//   'Continuous Learning', 'Outdoor Activities and Sports', 'Travel and Exploration'
// ];

// const fakeLangs = [
//   'Spanish', 'English', 'German', 'Italian'
// ]


const API_URL = import.meta.env.VITE_API_URL;

const UserPortfolio = ({ owner }) => {
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
  // const [owner, setOwner] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { user, isLoggedIn } = useContext(AuthContext);

  const {uniqueIdentifier} = useParams();

  useEffect(() => {

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
          setFirstName(response.data[0].firstName);
          setLastName(response.data[0].lastName);
        })
        .catch((error) => {
          console.log(error)
        })
  },[uniqueIdentifier])


  return (
    <div className = "container">
      {owner ? (<h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1>) : (<h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Welcome to my portfolio</h1>)}

        <div className = "tile is-ancestor mt-6">
          <div className ="tile is-4 is-vertical is-parent">
            <div className = "tile is-child box has-text-centered">
              {avatarURL ? (
                <figure className='image is-128x128'>
                  <img className='is-rounded' src={avatarURL} alt='avatar image' />
                </figure>
                ) : (
                <div>
                  <i className="fa-regular fa-user fa-2xl"></i>
                </div>
              )}

              <hr />
              <p className = 'has-text-centered is-size-4 mt-3'>{firstName} {lastName}</p>
              <h1 className = 'has-text-centered is-size-4 mt-3 has-text-primary'>{headLine ? headLine : 'Junior Full Stack Web Developer'}</h1>
            </div>

            <div className = "tile is-child box">
              <p className = "title">Skills</p>
              {!skills ? <p className='has-text-centered has-text-success'>Your added skills will show here</p> : (
                <div>
                {skills.map((skill, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-success is-light mr-3'>{skill}</span>
                    </div>
                  )
                })}
              </div>)}


              <hr />
              <p className = 'title'>Contact</p>
              <p><span><i className = 'fas fa-envelope mr-3 mb-3'></i></span>{email}</p>
              <p><span><i className = 'fas fa-phone mr-3 mb-3'></i></span>{phone}</p>
              <p><span><i className = "fa-brands fa-linkedin mr-3 mb-3"></i></span>{linkedInURL}</p>
              <p><span><i className = "fa-brands fa-github mr-3 mb-3"></i></span>{gitHubURL}</p>
              <p><span><i className = "fa-solid fa-location-pin mr-3 mb-3"></i></span>{location}</p>
            </div>

          </div>

          <div className = "tile is-parent">
            <div className = "tile is-child box">
              <p className = "title">About me</p>

              <p>{bio}</p>
                <hr />

              <p className = "is-size-4 my-4">Interests</p>
              <div>
                {interests.map((interest, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-primary is-light mr-3'>{interest}</span>
                    </div>
                  )
                })}
              </div>
              <hr />
              <p className = "is-size-4 my-4">Spoken Languages</p>
              <div>
                {languages.map((language, index) => {
                  return (
                    <div key = {index} className = 'is-inline-flex'>
                      <span className = 'tag is-primary is-light mr-3'>{language}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <button type='submit' className='button is-primary'>
          Save
        </button> */}
    </div>
  )
}

export default UserPortfolio
