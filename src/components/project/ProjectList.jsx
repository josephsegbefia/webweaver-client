/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Project from './Project'
import { AuthContext } from '../../context/auth.context'
import EditProject from './EditProject';
import AddProject from './AddProject';
import ProjectDetails from './ProjectDetails';

import DeleteConfirmation from './DeleteConfirmation';

const ProjectList = ({ checkOwner }) => {
  const [addProjectFormOpen, setAddProjectFormOpen] = useState(false);
  const [addProjectDetailsOpen, setProjectDetailsOpen] = useState(false)
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [refresh, setRefresh] = useState(false);
  const [addProjectEditFormOpen, setAddProjectEditFormOpen] = useState(false);

  /* This state is needed by EditEducation which is a direct child of this comp.
  However there is no way to directly access this (education._id) which can be found in Education.jsx hence this var
  was created to hold the id. The var is passed to the education comp to be updated sent back then passed to
  edit education comp.
  */
  const [projectId, setProjectId] = useState('');

  const { uniqueIdentifier } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleOpenEditProjectForm = () => {
    setAddProjectEditFormOpen(true);
  };
  const handleCloseEditProjectForm = () => {
    setAddProjectEditFormOpen(false);
  };


  const handleOpenAddProjectForm = () => {
    setAddProjectFormOpen(true);
  };

  const handleCloseAddProjectForm = () => {
    setAddProjectFormOpen(false);
  };

  const handleOpenProjectDetails = () => {
    setProjectDetailsOpen(true);
  }

  const handleCloseProjectDetails = () => {
    setProjectDetailsOpen(false);
  }

  // const checkOwner = () => {
  //   if (user) {
  //     if (user.uniqueIdentifier === uniqueIdentifier && isLoggedIn) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const limit = 6;

  const fetchProjectList = async () => {
    setLoadingProjects(true);
    try {
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/projects?limit=${limit}&offset=${(currentPage - 1) * limit }`);
      setProjectList(response.data.projects);
      console.log(response.data)
      // console.log(response.data.totalPages);
      setTotalPages(Math.ceil(response.data.totalPages))
      console.log(totalPages)
      setLoadingProjects(false);
    }catch(error){
      console.log("Error fetching projects", error.response.data.message);
      setErrorMessage(error.response.data.message)
      setLoadingProjects(false);
    }
  }

  useEffect(() => {
    fetchProjectList();
  }, [currentPage, refresh]);



  const nextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }




  return (
    <div className = "container">
      <p className="title is-size-3 my-6 has-text-centered">Projects</p>
      <hr />
      {loadingProjects && (
        <div className="columns is-vcentered">
          <div className="column">
            <progress className='progress is-medium is-link' max='100' style={{height: "4px"}}>
              60%
            </progress>
          </div>
        </div>
      )}

      {projectList.length > 0 ? (
        <Project
          projects = {projectList}
          checkOwner = {checkOwner}
          onOpenEditor = {handleOpenEditProjectForm}
          openProjectDetails = {handleOpenProjectDetails}
          setProjId = {setProjectId}
          setRefresh={setRefresh}
        />
        ) : (
        <div className = "columns is-centered is-vcentered">
          <div className = "column is-half has-text-centered">
            <p className = "has-text-danger is-size-5">No Projects added yet!</p>
          </div>
        </div>
      )}
      {totalPages > 1 && (
        <div className="columns">
          <div className="column is-half">
            <button className="button action is-warning" onClick={prevPage} disabled = {currentPage === 1}>Previous</button>
          </div>
          <div className="column is-half">
            <button className="button action is-primary" onClick={nextPage} disabled = {currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
      <div className="columns">
        <div className="column">
          {checkOwner && (
            <div>
              <button className="button is-primary my-3" onClick = {handleOpenAddProjectForm}>+ Add Project</button>
            </div>
          )}
        </div>
      </div>
      {addProjectFormOpen && <AddProject onClose = {handleCloseAddProjectForm} setRefresh={setRefresh} />}
      {addProjectEditFormOpen && <EditProject onClose = {handleCloseEditProjectForm} projId = {projectId} refresh = {setRefresh} />}
      {addProjectDetailsOpen && <ProjectDetails onClose = {handleCloseProjectDetails} projId = {projectId} />}
      {/* {openDelete && <DeleteConfirmation onClose = {handleCloseDeleteMessageConfirmation} setEdId = {setEducationId} />} */}
    </div>
  )
}

export default ProjectList;
