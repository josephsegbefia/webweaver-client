/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Education from './Education'
import { AuthContext } from '../../context/auth.context'
import AddEducation from './AddEducation'

const EducationList = () => {
  const [addEducationFormOpen, setAddEducationFormOpen] = useState(false);

  const { uniqueIdentifier } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);


  const handleOpenAddEducationForm = () => {
    setAddEducationFormOpen(true);
  };

  const handleCloseAddEducationForm = () => {
    setAddEducationFormOpen(false);
  };

  const checkOwner = () => {
    if (user) {
      if (user.uniqueIdentifier === uniqueIdentifier && isLoggedIn) {
        return true;
      }
    }
    return false;
  };


  const educations = [
    {
      schoolName: "Regional Maritime University",
      program: "Marine Engineering",
      beginDate: new Date("17-08-2008"),
      endDate: new Date("02-06-2012"),
      educationType: "Tertiary Education",
      earnedCert: "Under graduate"
    },
    {
      schoolName: "Regional Maritime University",
      program: "Marine Engineering",
      beginDate: new Date("17-08-2008"),
      endDate: new Date("02-06-2012"),
      educationType: "Tertiary Education",
      earnedCert: "Under graduate"
    },
    {
      schoolName: "Regional Maritime University",
      program: "Marine Engineering",
      beginDate: new Date("17-08-2008"),
      endDate: new Date("02-06-2012"),
      educationType: "Tertiary Education",
      earnedCert: "Under graduate"
    },
    {
      schoolName: "Regional Maritime University",
      program: "Marine Engineering",
      beginDate: new Date("17-08-2008"),
      endDate: new Date("02-06-2012"),
      educationType: "Tertiary Education",
      earnedCert: "Under graduate"
    },
    {
      schoolName: "Regional Maritime University",
      program: "Marine Engineering",
      beginDate: new Date("17-08-2008"),
      endDate: new Date("02-06-2012"),
      educationType: "Tertiary Education",
      earnedCert: "Under graduate"
    },
    {
      schoolName: "Regional Maritime University",
      program: "Marine Engineering",
      beginDate: Date.parse("01 Jan 1970 00:00:00 GMT"),
      endDate: Date.parse("02-06-2012"),
      educationType: "Tertiary Education",
      earnedCert: "Under graduate"
    }
  ]


  return (
    <div className = "container">
      <p className="title is-size-1 my-6 has-text-centered">Education</p>
      <hr />

      <Education educations = {educations} checkOwner = {checkOwner}/>
      <div className="columns">
        <div className="column">
          {checkOwner() && (
            <div>
              <button className="button is-primary my-3" onClick = {handleOpenAddEducationForm}>+ Add Education</button>
            </div>
          )}
        </div>
      </div>
      {addEducationFormOpen && <AddEducation onClose = {handleCloseAddEducationForm}/>}
    </div>
  )
}

export default EducationList
