/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import EditUserPortfolio from "./EditUserPortfolio";
import UserPortfolio from "./UserPortfolio";


import '../../assets/styles.scss'
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

const MasterPortfolioComp = () => {
  const [portfolioOwner, setPortfolioOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
          <EditUserPortfolio />
        ) : <UserPortfolio />}
      </div>
      {isLoggedIn && portfolioOwner ? (
        <div>
          {/* <h1 className = "has-text-centered is-size-4 mt-3 has-text-primary">Hello, { user && user.firstName} please complete your portfolio here</h1> */}
          <button onClick = {toggleEditMode} className = 'button is-warning navbar-end my-3'>{!editMode ? 'Edit Profile' : 'Cancel'}</button>
        </div>
      ) : (<><p></p></>)}
    </div>
  )
}

export default MasterPortfolioComp
