/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
// import EditEducation from './EditEducation';
import DeleteConfirmation from './DeleteConfirmation';

const Experience = ({ experiences, checkOwner, onOpenEditor, setExId, setRefresh }) => {
  const [experienceId, setExperienceId] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');

  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  console.log(experienceId);

  const handleDeleteNotificationShow = () => {
    setShowDeleteNotification(true);
  }



  const getExId = (exId) => {
    setExperienceId(exId);
    setExId(exId);
    onOpenEditor();
  }

  const getExIdAndPos4Del = (exId, position, company) => {
    setExperienceId(exId);
    // setPosition(position);
    setCompany(company);
    handleDeleteNotificationShow()
  }



  return (
    <div className="container">
      {showDeleteNotification && <DeleteConfirmation experienceId = {experienceId} setShowDeleteNotification = {setShowDeleteNotification} postion = {position} company = {company} setRefresh = {setRefresh}/>}
      <div className="columns">
        {experiences.length && experiences.sort((a, b)=> new Date(b.startDate) - new Date(a.startDate)).map((experience) => (
          <div key={experience._id} className="column is-half">
            <div className="card">
              <div className="card-content" style = {{textAlign: "justify"}}>
                <p className="is-size-5">
                  {experience.position} @ {experience.company}
                </p>
                <p className = "has-text-primary is-size-7">
                  <span><i className = "fa-solid fa-location-dot mr-3"></i></span>
                  {experience.location}
                </p>
                <p className = "has-text-primary is-size-7 mt-4">
                  {/* {formatDate(experience.startDate)} - {experience.currentPosition === false ? "Present" : formatDate(experience.endDate)} */}
                  {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : "Present"}
                </p>
                <hr />
                <div>
                  {experience.responsibilities.trim().split('.').map((responsibility, index) => (
                    <p key={index} className = "my-4"><li>{responsibility}</li></p>
                  ))}
                </div>
              </div>
              {checkOwner && (
                <footer className="card-footer">
                  <p className="card-footer-item" onClick={() => getExId(experience._id)}>
                    <span>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                  </p>
                  <p className="card-footer-item has-text-danger"
                    // onClick={()=> openDelete()}
                    onClick={() => getExIdAndPos4Del(experience._id, experience.position, experience.company)}
                  >
                    <span>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </p>
                </footer>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Experience;
