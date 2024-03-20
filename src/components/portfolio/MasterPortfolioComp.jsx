/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import EditUserPortfolio from "./EditUserPortfolio";
import UserPortfolio from "./UserPortfolio";
// import Project from "../project/Project";
import ExperienceList from "../experience/ExperienceList";
import EducationList from "../education/EducationList";
import ProjectList from "../project/ProjectList";
import "../project/project.css"


import '../../assets/styles.scss'
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;


const MasterPortfolioComp = () => {
  const [portfolioOwner, setPortfolioOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const { user, isLoggedIn } = useContext(AuthContext);

  const { uniqueIdentifier } = useParams();








  const toggleEditMode = () => {
    setEditMode(edit => !edit);
  }

  useEffect(() => {
    if(user && user.uniqueIdentifier === uniqueIdentifier){
      setPortfolioOwner(true);
    } else {
      setPortfolioOwner(false);
    }
  }, [uniqueIdentifier, user])

  console.log('Owner', portfolioOwner)


  return (
    <div className = 'container'>
      <div>
        {editMode && portfolioOwner ? (
          <EditUserPortfolio errorMessage = {errorMessage}/>
        ) : <UserPortfolio owner = {portfolioOwner} errorMessage = {errorMessage}/>}
      </div>
      {isLoggedIn && portfolioOwner ? (
        <div>
          {/* <h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1> */}
          <button onClick = {toggleEditMode} className = 'button is-warning navbar-end my-3'>{!editMode ? 'Edit Profile' : 'Cancel'}</button>
        </div>
      ) : ("")}
      <ExperienceList />
      <EducationList />
      <ProjectList />
      {/* <Project
        projects = {projects}
        next = {nextPage}
        previous = {prevPage}
        loading = {loadingProjects}
        currentPage = {currentPage}
        totalPages = {totalPages}
      /> */}
    </div>
  )
}



export default MasterPortfolioComp
