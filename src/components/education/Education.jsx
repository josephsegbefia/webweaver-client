/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const Education = ({ educations, checkOwner }) => {
  const [addEducationFormOpen, setAddEducationFormOpen] = useState(false);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className = "container">
    <div className="columns is-multiline">
      {educations.map((education, index) => (
        <div key={index} className="column is-one-third">
        <div className="card">
          <div className="card-content">
            <p className = "is-size-5"><span><i className = "fa-solid fa-school mr-3 mb-3"></i></span>{education.schoolName}</p>
            <hr />
            <p className = "is-size-7 has-text-primary"><span><i className = "fa-solid fa-book-open-reader mr-4 mb-4"></i></span>{education.program}</p>
            <p className = "is-size-7 has-text-primary"><span><i className = "fa-solid fa-graduation-cap mr-4 mb-4"></i></span>{education.educationType}</p>
            <p className = "is-size-7 has-text-primary"><span><i className="fa-solid fa-certificate mr-4 mb-4"></i></span>{education.earnedCert}</p>
            <p className = "is-size-7 has-text-success"><span><i className = "fa-solid fa-play mr-4 mb-4"></i></span>{formatDate(education.beginDate)}</p>
            <p className = "is-size-7 has-text-danger"><span><i className = "fa-regular fa-circle-stop mr-4 mb-4"></i></span>{formatDate(education.endDate)}</p>
          </div>
          {checkOwner() && (
            <footer className="card-footer">
              <p className="card-footer-item">
                <span>
                  <i className = "fa-solid fa-pen-to-square"></i>
                </span>
              </p>
              <p className="card-footer-item has-text-danger">
                <span>
                  <i className ="fa-solid fa-trash"></i>
                </span>
              </p>
            </footer>
          )}
        </div>
      </div>
      ))}
    </div>
    {/* <div className="columns">
      <div className="column">
        {checkOwner() && (
          <div>
            <button className="button is-primary">+ Add Education</button>
          </div>
        )}
      </div>
      </div> */}
    </div>
  )
}

export default Education;
