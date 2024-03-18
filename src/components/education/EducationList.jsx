/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Education from './Education'
import { AuthContext } from '../../context/auth.context'
import AddEducation from './AddEducation'
import EditEducation from './EditEducation';

const EducationList = () => {
  const [addEducationFormOpen, setAddEducationFormOpen] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)
  const [loadingEducations, setLoadingEducations] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  /* This state is needed by EditEducation which is a direct child of this comp.
  However there is no way to directly access this (education._id) which can be found in Education.jsx hence this var
  was created to hold the id. The var is passed to the education comp to be updated sent back then passed to
  edit education comp.
  */
  const [educationId, setEducationId] = useState('');

  const { uniqueIdentifier } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);

  const [addEducationEditFormOpen, setAddEducationEditFormOpen] = useState(false);
  // const [editMode, setEditMode] = useState(false);

  const handleOpenEditEducationForm = () => {
    setAddEducationEditFormOpen(true);
  };
  const handleCloseEditEducationForm = () => {
    setAddEducationEditFormOpen(false);
  };


  const API_URL = import.meta.env.VITE_API_URL;

  const handleOpenAddEducationForm = () => {
    setAddEducationFormOpen(true);
  };

  const handleCloseAddEducationForm = () => {
    setAddEducationFormOpen(false);
  };

  const checkOwner = () => {
    if (user) {
      if (user.uniqueIdentifier === uniqueIdentifier && isLoggedIn) {
        return true;
      }
    }
    return false;
  };

  const limit = 3;

  const fetchEducationList = async () => {
    setLoadingEducations(true);
    try {
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/educations?limit=${limit}&offset=${(currentPage - 1) * limit }`);
      setEducationList(response.data.educations);
      console.log(educationList)
      // console.log(response.data.totalPages);
      setTotalPages(Math.ceil(response.data.totalPages))
      console.log(totalPages)
      setLoadingEducations(false);
    }catch(error){
      console.log("Error fetching projects", error.response.data.message);
      setErrorMessage(error.response.data.message)
      setLoadingEducations(false);
    }
  }

  useEffect(() => {
    fetchEducationList();
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
      <p className="title is-size-1 my-6 has-text-centered">Education</p>
      <hr />
      {loadingEducations && (
        <div className="columns is-vcentered">
          <div className="column">
            <progress className='progress is-medium is-link' max='100'>
              60%
            </progress>
          </div>
        </div>
      )}

      {educationList.length > 0 ? (<Education educations = {educationList} checkOwner = {checkOwner} onOpenEditor = {handleOpenEditEducationForm} setEdId = {setEducationId}/>) : (
        <div className = "columns is-centered is-vcentered">
          <div className = "column is-half has-text-centered">
            <p className = "has-text-danger is-size-5">Education history not provided</p>
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
      `</div>
      )}
      <div className="columns">
        <div className="column">
          {checkOwner() && (
            <div>
              <button className="button is-primary my-3" onClick = {handleOpenAddEducationForm}>+ Add Education</button>
            </div>
          )}
        </div>
      </div>
      {addEducationFormOpen && <AddEducation onClose = {handleCloseAddEducationForm}/>}
      {addEducationEditFormOpen && <EditEducation onClose = {handleCloseEditEducationForm} edId = {educationId} refresh = {setRefresh} />}
    </div>
  )
}

export default EducationList
