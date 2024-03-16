/* eslint-disable no-unused-vars */
import React from 'react'
import Education from './Education'

const EducationList = () => {

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

      <Education educations = {educations} />
    </div>
  )
}

export default EducationList
