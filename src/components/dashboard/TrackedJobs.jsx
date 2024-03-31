/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import JobDetails from './JobDetails';

// API URL
const API_URL = import.meta.env.VITE_API_URL;

const TrackedJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)

  const { user } = useContext(AuthContext);
  const [trackedJobs, setTrackedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // For modal - States
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [jobId,setJobId] = useState('');

  const getJobId = (id) => {
    handleOpenDetails();
    setJobId(id);
  }
  // For modal - Functions
  const handleCloseDetails = () => {
    setDetailsOpen(false);
  }

  const handleOpenDetails = () => {
    setDetailsOpen(true);
  }
  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);



  const limit = 10;

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
  }, [currentPage]);

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
      {loading ? (
        <progress className='progress is-medium is-link' max='100' style={{ height: '3px' }}>
          60%
        </progress>
      ) : (
        <table className="table">
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
          {trackedJobs.map((job) => (
            <tr key={job._id}>
              <td className = 'is-size-7'>{job.companyName}</td>
              <td className = 'is-size-7'>{job.position}</td>
              <td className = 'is-size-7'>{job.jobLocation}</td>
              <td className = 'is-size-7'>{job.status}</td>
              <td className = 'is-size-7'>{formatDate(job.appliedDate)}</td>
              <td>
                <div className="buttons">
                  {/* Add action buttons here */}
                  <button className="button is-primary is-small" onClick={()=> getJobId(job._id)}>View</button>
                  <button className="button is-warning is-small">Edit</button>
                  <button className="button is-danger is-small">Delete</button>
                  {/* Add more action buttons as needed */}
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
    </div>
  );
};

export default TrackedJobs;
