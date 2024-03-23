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

    </div>
  )
}

export default Dashboard;
