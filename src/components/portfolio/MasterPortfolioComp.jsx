/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import EditUserPortfolio from "./EditUserPortfolio";
import UserPortfolio from "./UserPortfolio";
import Project from "../project/Project";


import '../../assets/styles.scss'
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL;

// const projects = [
//   {
//     title: "First Project",
//     description: "A first description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "Second Project",
//     description: "A second description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "First Project",
//     description: "A first description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "First Project",
//     description: "A first description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "Second Project",
//     description: "A second description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "First Project",
//     description: "A first description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "First Project",
//     description: "A first description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "Second Project",
//     description: "A second description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   },
//   {
//     title: "First Project",
//     description: "A first description",
//     imgUrl: "https://res.cloudinary.com/dexb8osc9/image/upload/v1710262854/webweaver/innjvjnqhkaizgo4nzoa.jpg",
//     shortDesc: "A short description",
//     techsUsed: ["react", "HTML", "CSS"]
//   }
// ]

const MasterPortfolioComp = () => {
  const [portfolioOwner, setPortfolioOwner] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState()

  const limit = 6;
  const { user, isLoggedIn } = useContext(AuthContext);

  const { uniqueIdentifier } = useParams();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/projects?limit=${limit}&offset=${(currentPage - 1) * limit }`);
      setProjects(response.data);
      console.log(response.data);
    }catch(error){
      console.log("Error fetching projects", error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);



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
      <Project projects = {projects} />
    </div>
  )
}

export default MasterPortfolioComp
