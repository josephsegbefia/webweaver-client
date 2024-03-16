/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Education = ({ educations }) => {


  return (
    <div className="columns is-multiline">
      {educations.length > 0 && educations.map((education, index) => (
        <div key={index} className="column is-one-third">
        <div className="card">
          <div className="card-content">
          <p className = "is-size-5"><span><i className = "fa-solid fa-school mr-3 mb-3"></i></span>{education.schoolName}</p>
          <p className = "is-size-7"><span><i className = "fa-solid fa-book-open-reader mr-4 mb-4"></i></span>{education.program}</p>
          <p className = "is-size-7"><span><i className = "fa-solid fa-graduation-cap mr-4 mb-4"></i></span>{education.educationType}</p>
          <p className = "is-size-7"><span><i className="fa-solid fa-certificate mr-4 mb-4"></i></span>{education.earnedCert}</p>
          <p className = "is-size-7"><span><i className = "fa-solid fa-play mr-4 mb-4"></i></span>17 Aug 08</p>
          <p className = "is-size-7"><span><i className = "fa-regular fa-circle-stop mr-4 mb-4"></i></span>02 Jun 12</p>

            <p className="subtitle">{education.shortDesc}</p>

          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Education;
