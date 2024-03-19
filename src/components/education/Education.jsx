/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
// import EditEducation from './EditEducation';
import DeleteConfirmation from './DeleteConfirmation';

const Education = ({ educations, checkOwner, onOpenEditor, setEdId, setRefresh }) => {
  const [educationId, setEducationId] = useState('');
  const [schoolName, setSchoolName] = useState('');

  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };


  const handleDeleteNotificationShow = () => {
    setShowDeleteNotification(true);
  }



  const getEdId = (edId) => {
    setEducationId(edId);
    setEdId(edId);
    onOpenEditor();
  }

  const getEIdAndSch4Del = (edId, name) => {
    setEducationId(edId);
    setSchoolName(name);
    handleDeleteNotificationShow()
  }

  console.log("EducationId====>", educationId)

  return (
    <div className="container">
      {showDeleteNotification && <DeleteConfirmation educationId = {educationId} setShowDeleteNotification = {setShowDeleteNotification} schoolName = {schoolName} reload = {setRefresh}/>}
      <div className="columns is-multiline">
        {educations.map((education, index) => (
          <div key={index} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="is-size-5">
                  <span><i className="fa-solid fa-school mr-3 mb-3"></i></span>
                  {education.schoolName}
                </p>
                <hr />
                <p className="is-size-7 has-text-primary">
                  <span><i className="fa-solid fa-book-open-reader mr-4 mb-4"></i></span>
                  {education.program}
                </p>
                <p className="is-size-7 has-text-primary">
                  <span><i className="fa-solid fa-graduation-cap mr-4 mb-4"></i></span>
                  {education.educationType}
                </p>
                <p className="is-size-7 has-text-primary">
                  <span><i className="fa-solid fa-certificate mr-4 mb-4"></i></span>
                  {education.earnedCert}
                </p>
                <p className="is-size-7 has-text-success">
                  <span><i className="fa-solid fa-play mr-4 mb-4"></i></span>
                  {formatDate(education.beginDate)}
                </p>
                <p className="is-size-7 has-text-danger">
                  <span><i className="fa-regular fa-circle-stop mr-4 mb-4"></i></span>
                  {formatDate(education.endDate)}
                </p>
              </div>
              {checkOwner() && (
                <footer className="card-footer">
                  <p className="card-footer-item" onClick={() => getEdId(education._id)}>
                    <span>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                  </p>
                  <p className="card-footer-item has-text-danger"
                    // onClick={()=> openDelete()}
                    onClick={() => getEIdAndSch4Del(education._id, education.schoolName)}
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

export default Education;
