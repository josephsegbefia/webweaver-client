/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SignUp from './auth/SignUp';
import HomeCard from './HomeCard';
import portfolioman from '../assets/manbooks.png';
import jobman from '../assets/jobman.png';
import robogirl from '../assets/robogirl.png'
import logo from '../assets/logo.png';

const Home = ({ setDashboardActive }) => {

  useEffect(() => {
    setDashboardActive(false);
  }, []);






  return (
    <div className = "container">
      <div className = "columns intro mb-6">
        <div className = "column">
          <p className = "is-size-6 mt-6" style={{lineHeight: "30px", textAlign: "justify", padding: "15px", margin: "0 auto"}}>
            Welcome to our portfolio platform, where crafting your professional story is made simple.
            Seamlessly create personalized portfolios, showcasing your projects, education, experience, and more.
            Stay organized by managing job applications with attached CVs and resumes.
            Excitingly, AI integration is on the horizon, promising automated CV and cover letter creation.
            Start shaping your career journey effortlessly today
          </p>
        </div>
        <div className = "vertical-line"></div>
        <div className = "column">
          <SignUp />
        </div>
      </div>
      <div className = "columns">
        <div className = "column">
          <p className = "title has-text-centered">Features</p>
          <p className = "subtitle has-text-centered">Advantages Provided by Our Platform</p>
          <hr />
        </div>

      </div>
      <div className = "columns my-5">
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
      {/* Show this section later */}
      <div className = "columns">
        <div className = "column"></div>
      </div>
      {/* <div className = "columns">
        <div className = "column">
          <div className = "card">
            <div className = "card-content">
              <p className = "has-text-centered has-text-primary is-size-3">5 active users</p>
            </div>
          </div>
        </div>
        <div className = "column">
          <div className = "card">
            <div className = "card-content">

            </div>
          </div>
        </div>
        <div className = "column">
          <div className = "card">
            <div className = "card-content">

            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Home
