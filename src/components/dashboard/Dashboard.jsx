/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import DashNav from './DashNav';

const Dashboard = ({ setDashboardActive }) => {

  useEffect(() => {
    setDashboardActive(true);
  })

  return (
    <div>
      <h1 className="title is-size-2">Welcome to the admin console</h1>
      <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
              <div className="tile">
                  <div className="tile is-parent is-vertical">
                      <article className="tile is-child notification is-primary">
                          <p className="title">Latest news</p>
                          <p className="subtitle">hot news from our desk to yours</p>
                      </article>
                      <article className="tile is-child notification is-warning">
                          <p className="title">Product updates</p>
                          <p className="subtitle">latest product releases for you</p>
                      </article>
                  </div>
                  <div className="tile is-parent">
                      <article className="tile is-child notification is-info">
                          <p className="title">Important work</p>
                          <p className="subtitle">Image to follow</p>
                          <figure className="image is-4by3">
                              <img src="https://placedog.net/640/480" />
                          </figure>
                      </article>
                  </div>
              </div>
              <div className="tile is-parent">
                  <article className="tile is-child notification is-danger">
                      <p className="title">An exciting title</p>
                      <div className="content">
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus sit amet ex accumsan euismod. Donec vehicula fermentum augue, a sodales justo gravida congue. Cras mattis augue metus
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
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus sit amet ex accumsan euismod. Donec vehicula fermentum augue, a sodales justo gravida congue. Cras mattis augue metus
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
