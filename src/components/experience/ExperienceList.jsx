/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Experience from './Experience';
import { AuthContext } from '../../context/auth.context'
import AddExperience from './AddExperience'
import EditEducation from './EditEducation';
import DeleteConfirmation from './DeleteConfirmation';

const ExperienceList = () => {
  const [addExperienceFormOpen, setAddExperienceFormOpen] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)
  const [loadingExperiences, setLoadingExperiences] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  /* This state is needed by EditEducation which is a direct child of this comp.
  However there is no way to directly access this (education._id) which can be found in Education.jsx hence this var
  was created to hold the id. The var is passed to the education comp to be updated sent back then passed to
  edit education comp.
  */
  const [experienceId, setExperienceId] = useState('');

  const { uniqueIdentifier } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);

  const [addExperienceEditFormOpen, setAddExperienceEditFormOpen] = useState(false);
  // const [editMode, setEditMode] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleOpenEditExperienceForm = () => {
    setAddExperienceEditFormOpen(true);
  };
  const handleCloseEditExperienceForm = () => {
    setAddExperienceEditFormOpen(false);
  };


  const handleOpenAddExperienceForm = () => {
    setAddExperienceFormOpen(true);
  };

  const handleCloseAddExperienceForm = () => {
    setAddExperienceFormOpen(false);
  };

  const checkOwner = () => {
    if (user) {
      if (user.uniqueIdentifier === uniqueIdentifier && isLoggedIn) {
        return true;
      }
    }
    return false;
  };

  const limit = 2;

  const fetchExperienceList = async () => {
    setLoadingExperiences(true);
    try {
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/experiences?limit=${limit}&offset=${(currentPage - 1) * limit }`);
      setExperienceList(response.data.experiences);
      console.log(experienceList)
      // console.log(response.data.totalPages);
      setTotalPages(Math.ceil(response.data.totalPages))
      console.log(totalPages)
      setLoadingExperiences(false);
    }catch(error){
      console.log("Error fetching projects", error.response.data.message);
      setErrorMessage(error.response.data.message)
      setLoadingExperiences(false);
    }
  }

  useEffect(() => {
    fetchExperienceList();
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
      <p className="title is-size-3 my-6 has-text-centered">Experience</p>
      <hr />
      {loadingExperiences && (
        <div className="columns is-vcentered">
          <div className="column">
            <progress className='progress is-medium is-link' max='100'>
              60%
            </progress>
          </div>
        </div>
      )}

      {experienceList.length > 0 ? (
        <Experience
          experiences = {experienceList}
          checkOwner = {checkOwner}
          onOpenEditor = {handleOpenEditExperienceForm}
          setExId = {setExperienceId}
          setRefresh={setRefresh}
          // openDelete = {handleOpenDeleteMessageConfirmation}
        />
        ) : (
        <div className = "columns is-centered is-vcentered">
          <div className = "column is-half has-text-centered">
            <p className = "has-text-danger is-size-5">Experience history not provided</p>
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
          {checkOwner() && (
            <div>
              <button className="button is-primary my-3" onClick = {handleOpenAddExperienceForm}>+ Add Experience</button>
            </div>
          )}
        </div>
      </div>
      {addExperienceFormOpen && <AddExperience onClose = {handleCloseAddExperienceForm} setRefresh={setRefresh} />}
      {/* {addExperienceEditFormOpen && <EditEducation onClose = {handleCloseEditEducationForm} exId = {experienceId} refresh = {setRefresh} />} */}
      {/* {openDelete && <DeleteConfirmation onClose = {handleCloseDeleteMessageConfirmation} setEdId = {setEducationId} />} */}
    </div>
  )
}

export default ExperienceList;
