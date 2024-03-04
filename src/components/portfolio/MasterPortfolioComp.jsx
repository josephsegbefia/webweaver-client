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

  const { user, isLoggedIn } = useContext(AuthContext);

  const { uniqueIdentifier } = useParams();

  if(user){
    console.log(user.uniqueIdentifier === uniqueIdentifier)
  }


  return (
    <div>

    </div>
  )
}

export default MasterPortfolioComp
