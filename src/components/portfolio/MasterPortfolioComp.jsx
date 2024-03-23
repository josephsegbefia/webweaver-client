/* eslint-disable react/prop-types */
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
import CreateMessage from "../message/createMessage";
import Footer from "../../Footer";
import "../project/project.css"


import '../../assets/styles.scss'
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


const API_URL = import.meta.env.VITE_API_URL;


const MasterPortfolioComp = ({ setDashboardActive }) => {

  useEffect(() => {
    setDashboardActive(false);
  }, [])

  const [portfolioOwner, setPortfolioOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const { user, isLoggedIn } = useContext(AuthContext);

  const { uniqueIdentifier } = useParams();


  const toggleEditMode = () => {
    setEditMode(true);
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
          <EditUserPortfolio errorMessage = {errorMessage} toggleEditMode = {toggleEditMode} setEditMode ={setEditMode} />
        ) : <UserPortfolio owner = {portfolioOwner} errorMessage = {errorMessage}/>}
        {isLoggedIn && portfolioOwner && !editMode && (
          <div className = "column is-half">
            <button onClick = {toggleEditMode} className = 'button is-warning my-3'>{!editMode && 'Edit Profile'}</button>
          </div>
        )}
      </div>
      <ExperienceList />
      <EducationList />
      <ProjectList />
      {!portfolioOwner && (<CreateMessage />)}
      <Footer />
    </div>
  )
}



export default MasterPortfolioComp
