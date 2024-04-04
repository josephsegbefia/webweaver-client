/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const QUOTE_URL = import.meta.env.VITE_QUOTE_URL;
// const X_API_KEY = import.meta.env.VITE_X_API_KEY;

const Dashboard = ({ setDashboardActive, dashboardActive }) => {
  const [jobNumber, setJobNumber] = useState(0);
  const [projectNumber, setProjectNumber] = useState(0);
  const [owner, setOwner] = useState(null);
  // const [quote, setQuote] = useState(undefined);
  const { user } = useContext(AuthContext);

  console.log(user);
  const fetchData = async (identifier) => {
    const storedToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get(
        `${API_URL}api/users/${identifier}/dashboard`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      const data = response.data.portfolio[0];
      setJobNumber(data.jobs.length);
      setProjectNumber(data.projects.length);
    } catch (error) {
      console.log(error);
    }
  };

  const name = useRef();
  useEffect(() => {
    if (user) {
      setOwner(user);
      name.current = user.firstName;
      console.log(name.current)
      fetchData(user.uniqueIdentifier);
      setDashboardActive(true);
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setOwner(storedUser);
        name.current = storedUser.firstName
        console.log(name.current)
        fetchData(storedUser.uniqueIdentifier);
      }
    }
  }, [user]);

  // useEffect(() => {
  //   const fetchQuote = async () => {
  //     try {
  //       const response = await axios.get(`${QUOTE_URL}api/motivations`);
  //       const data = response.data[0];
  //       setQuote(data);
  //     } catch (error){
  //       console.log(error);
  //     }
  //   };
  //   fetchQuote(); // This effect only runs once when the component mounts
  // }, []);

  // useEffect(() => {
  //   setDashboardActive(true);
  //   localStorage.setItem('dashboardActive', dashboardActive);
  // }, [dashboardActive]); // Only re-run effect i

  return (
    <div>
      <h1 className="title is-size-4">{name.current}&apos;s dashboard</h1>
      <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
              <div className="tile">
                  <div className="tile is-parent is-vertical">
                      <article className="tile is-child notification is-primary">
                          <p className="title is-size-6">Job Application updates</p>
                          <hr />
                          {
                            jobNumber <= 0 ? (
                              <p className="subtitle is-size-6 has-text-danger">No jobs applied to yet!</p>
                            ) : (
                              <p className = "subtitle is-size-6 has-text-danger">{jobNumber} applied to so far!</p>
                            )
                          }
                      </article>
                      <article className="tile is-child notification is-warning">
                          <p className="title is-size-6">Project updates</p>
                          <hr />
                          {
                            projectNumber.length <= 0 ? (
                              <p className="subtitle">No projects in your portfolio yet.</p>
                            ) : (
                              <p className="subtitle is-size-6">Number of projects: {projectNumber}</p>
                            )
                          }

                      </article>
                  </div>
                  <div className="tile is-parent">
                      <article className="tile is-child notification is-info">
                          <p className="title is-size-6">Important work</p>
                          <p className="subtitle">Image to follow</p>
                          <figure className="image is-4by3">
                            <img src="https://placedog.net/640/480" />
                          </figure>
                      </article>
                  </div>
              </div>
              <div className="tile is-parent">
                  <article className="tile is-child notification is-danger">
                      <p className="title is-size-6">Something to keep you going</p>
                      <hr />
                      <div className="content">
                          <p>
                            {/* {quote.quote} */}
                          </p>
                          <p>
                            {/* - {quote.author} */}
                          </p>
                      </div>
                  </article>
              </div>
          </div>
          <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                  <div className="content">
                      <p className="title">Another exciting title</p>
                      <p className="subtitle">With even more content</p>
                      <div className="content">
                          <p>

                          </p>
                      </div>
                  </div>
              </article>
          </div>
      </div>
    </div>
  )
}

export default Dashboard;
