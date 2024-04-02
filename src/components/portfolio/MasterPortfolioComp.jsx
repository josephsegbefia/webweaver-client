/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EditUserPortfolio from "./EditUserPortfolio";
import UserPortfolio from "./UserPortfolio";
import ExperienceList from "../experience/ExperienceList";
import EducationList from "../education/EducationList";
import ProjectList from "../project/ProjectList";
import CreateMessage from "../message/createMessage";
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const MasterPortfolioComp = ({ setDashboardActive }) => {
  const [portfolioOwner, setPortfolioOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [visitorSight, setVisitorSight] = useState(false);


  const { user, isLoggedIn } = useContext(AuthContext);
  const { uniqueIdentifier } = useParams();

  const toggleEditMode = () => {
    setEditMode(true);
  }

  console.log("Visitor Sight:", visitorSight);
  console.log("PortfolioOwner:", portfolioOwner);

  // Toggle between owner's view and visitor's view
  const toggleVisitorSight = () => {
    setVisitorSight(prevState => !prevState);
    setPortfolioOwner(prevState => !prevState)
  }

  useEffect(() => {
    setDashboardActive(false)
  })

  useEffect(() => {
    if (user && user.uniqueIdentifier === uniqueIdentifier) {
      setPortfolioOwner(true);
    } else {
      setPortfolioOwner(false);
    }
  }, [uniqueIdentifier, user])

  return (
    <div className='container'>
      <div>
        {(editMode && portfolioOwner && !visitorSight) ? (
          <EditUserPortfolio errorMessage={errorMessage} toggleEditMode={toggleEditMode} setEditMode={setEditMode} />
        ) : (
          <UserPortfolio owner={portfolioOwner} errorMessage={errorMessage} />
        )}
        {isLoggedIn && portfolioOwner && !editMode && (
          <div className="column is-half">
            <button onClick={toggleEditMode} className='button is-warning my-3'>{!editMode && 'Edit Profile'}</button>
          </div>
        )}
      </div>
      <ExperienceList checkOwner = {portfolioOwner} />
      <EducationList checkOwner = {portfolioOwner} />
      <ProjectList checkOwner = {portfolioOwner} />
      {!portfolioOwner && (<CreateMessage />)}

      {/* Button to toggle visitor's view */}
      {
        portfolioOwner && !visitorSight && (
          <div className="columns" style={{ marginTop: "5rem" }}>
            <div className="column is-half is-offset-one-quarter">
              <button className="button action is-primary" type="button" onClick={toggleVisitorSight}>
                What a visitor would see
              </button>
            </div>
          </div>
        )
      }
      {
        !portfolioOwner && visitorSight && (
          <div className="columns" style={{ marginTop: "5rem" }}>
            <div className="column is-half is-offset-one-quarter">
              <button className="button action is-primary" type="button" onClick={toggleVisitorSight}>
                Back to owner view
              </button>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default MasterPortfolioComp;
