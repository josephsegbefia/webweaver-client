/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import JobDetails from './JobDetails';
import EditJob from './EditJob';
import DeleteJobTracking from './DeleteJobTracking';

// API URL
const API_URL = import.meta.env.VITE_API_URL;

const TrackedJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(undefined);

  const { user } = useContext(AuthContext);
  const [trackedJobs, setTrackedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // For modal - States
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [jobId,setJobId] = useState('');


  // Handle delete Open;
  const handleDeleteOpen = (id) => {
    setJobId(id);
    setDeleteOpen(true);
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  }

  const closeDeleteMessage = () => {
    setDeleteStatus(false);
  }


  // For modal - Functions
  const handleCloseDetails = () => {
    setDetailsOpen(false);
  }

  const handleOpenDetails = () => {
    setDetailsOpen(true);
  }

  const handleOpenEdit = () => {
    setEditOpen(true);
  }

  const handleCloseEdit = () => {
    setEditOpen(false);
  }

  const getJobIdAndOpenViewJobModal = (id) => {
    handleOpenDetails();
    setJobId(id);
  }

  const getJobIdAndOpenEditJobModal = (id) => {
    handleOpenEdit();
    setJobId(id);
  }

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);



  const limit = 10;

  const nextPage = () => {
    handleDeleteClose()
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    handleDeleteClose();
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const fetchTrackedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/jobs?limit=${limit}&offset=${(currentPage - 1) * limit }`);
      console.log(response.data);
      setTrackedJobs(response.data.jobs);
      setTotalPages(Math.ceil(response.data.totalPages))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tracked jobs:', error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTrackedJobs();
  }, [currentPage, editOpen, deleteStatus]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  console.log(trackedJobs);
  return (
    <div className="container">
      <h1 className="title is-size-5 has-text-centered mb-5">Tracked Jobs</h1>
      <hr />
      {deleteStatus && (
        <article className= {`message ${deleteStatus ? 'is-success' : 'is-danger' }`}>
        <div className="message-header">
          <p>Success</p>
          <button onClick = {closeDeleteMessage} className="delete" aria-label="delete"></button>
        </div>
        <div className = "message-body">
          <p>{deleteMessage}</p>
        </div>
      </article>
      )}
      {deleteOpen && (<DeleteJobTracking handleDeleteClose = {handleDeleteClose} jobId = {jobId} setDeleteSuccessful = {setDeleteStatus} setDeleteMessage={setDeleteMessage}/>)}
      {loading ? (
        <progress className='progress is-medium is-link' max='100' style={{ height: '4px' }}>
          60%
        </progress>
      ) : (
        <table className="table is-fullwidth my-5">
        <thead>
          <tr>
            <th className = 'is-size-7'>Company</th>
            <th className = 'is-size-7'>Position</th>
            <th className = 'is-size-7'>Location</th>
            <th className = 'is-size-7'>Status</th>
            <th className = 'is-size-7'>Application Date</th>
            <th className = 'is-size-7 has-text-centered'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trackedJobs.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((job) => (
            <tr key={job._id}>
              <td className = 'is-size-7'>{job.companyName}</td>
              <td className = 'is-size-7 mr-4'>{job.position}</td>
              <td className = 'is-size-7 mr-4'>{job.jobLocation}</td>
              <td className = 'is-size-7'>{job.status.toUpperCase()}</td>
              <td className = 'is-size-7'>{formatDate(job.appliedDate)}</td>
              <td>
                <div className="buttons">

                  <button className="button is-primary is-small" onClick={()=> getJobIdAndOpenViewJobModal(job._id)}>View</button>
                  <button className="button is-warning is-small" onClick={() => getJobIdAndOpenEditJobModal(job._id)}>Edit</button>
                  <button className="button is-danger is-small" onClick = {() => handleDeleteOpen(job._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      {detailsOpen && <JobDetails onClose = {handleCloseDetails} jobId = {jobId}/>}
      {editOpen && <EditJob onClose = {handleCloseEdit} jobId = {jobId} />}
    </div>
  );
};

export default TrackedJobs;
