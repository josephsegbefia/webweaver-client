/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import SignUp from './auth/SignUp';
import HomeCard from './HomeCard';
import portfolioman from '../assets/manbooks.png';
import jobman from '../assets/jobman.png';
import robogirl from '../assets/robogirl.png'

const Home = ({ setDashboardActive }) => {

  useEffect(() => {
    setDashboardActive(false);
  }, [])

  return (
    <div className = "container">
      <div className = "columns mb-6">
        <div className = "column" style={{border: "1px solid red"}}>First col</div>
        <div className = "column">
          <SignUp />
        </div>
      </div>
      <div className = "columns">
        <div className = "column">
          <p className = "title has-text-centered">Features</p>
          <hr />
        </div>

      </div>
      <div className = "columns">
        <div className = "column has-text-centered">
          <HomeCard
            imgSrc={portfolioman}
            headline = "Craft and share your portfolio effortlessly."
            title = "Create your own portfolio"
            contents = {["Create a free account", "Create your project portfolio", "Share portfolio link with recruiters and friends"]} />
        </div>
        <div className = "column has-text-centered">
          <HomeCard
            imgSrc={jobman}
            headline = "Stay organized with your applications."
            title = "Manage job applications"
            contents = {["Provide details of a compeleted job application", "Upload documents used", "Change application status over time", "Retrieve application documents before interview"]}
          />
        </div>
        <div className = "column has-text-centered">
          <HomeCard
            imgSrc={robogirl}
            headline = "Job hunting made enjoyable."
            title="AI powered job applications"
            contents = {["Upcoming: Personalized Job Listings from Your Portfolio", " Upcoming: AI assisted CV creation", "Upcoming: AI assisted cover letter writing"]}

          />
        </div>
      </div>
      <div className = "columns">
        <div className = "column" style = {{backgroundColor: "#00d1b2"}}>
          <p className = "title is-size-2 has-text-centered m-5" style = {{color: "white"}}>It&apos;s free</p>
        </div>
      </div>
    </div>
  )
}

export default Home
