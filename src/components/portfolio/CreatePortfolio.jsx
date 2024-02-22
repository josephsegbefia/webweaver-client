/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;

const CreatePortfolio = () => {
  const [headLine, setHeadLine] = useState('');
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState('');
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

  useEffect(() => {
    if(user){
      axios.get(`${API_URL}api/portfolios/${user.uniqueIdentifier}`)
        .then((response) => {
          console.log(response.data[0]);
          setHeadLine(response.data[0].headLine);
          setBio(response.data[0].bio);
        })
    }
  }, [user]);


  return (
    <div className = "container">
      <h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1>
      <form>
        <div className = "tile is-ancestor mt-6">
          <div className ="tile is-4 is-vertical is-parent">
            <div className = "tile is-child box">
              <p className = "title">Upload a profile photo</p>
              <div className = "file">
              <label className = "file-label">
                <input className = "file-input" type="file" name="resume" />
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

              <input type = 'text' className = 'input' value = {headLine} />
            </div>

            <div className = "tile is-child box">
              <p className = "title">Skills</p>
              <input
                type =  "text"
                name = 'skills'
                placeholder = 'Add the skills you have one after the other and press the + button after each add'
                className = 'input'
                disabled
                // value = ''
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
