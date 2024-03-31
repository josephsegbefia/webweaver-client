/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

// API URL
const API_URL = import.meta.env.VITE_API_URL;

const TrackedJobs = () => {
  const { user } = useContext(AuthContext);
  const [trackedJobs, setTrackedJobs] = useState([]);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);

  const fetchTrackedJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/jobs`);
      console.log(response.data);
      setTrackedJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching tracked jobs:', error);
    }
  };

  useEffect(() => {
    fetchTrackedJobs();
  }, []);

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
      <table className="table">
        <thead>
          <tr>
            <th className = 'is-size-7'>Company</th>
            <th className = 'is-size-7'>Position</th>
            <th className = 'is-size-7'>Location</th>
            <th className = 'is-size-7'>Status</th>
            <th className = 'is-size-7'>Application Date</th>
            <th className = 'is-size-7'>Actions</th>
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
                  <button className="button is-primary is-small">Action 1</button>
                  <button className="button is-danger is-small">Action 2</button>
                  {/* Add more action buttons as needed */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackedJobs;
