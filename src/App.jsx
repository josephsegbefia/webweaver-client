/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import PasswordResetForm from './components/auth/PasswordResetForm';
import Footer from './Footer';

import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/dashboard/Messages';
import RoutesComp from './components/dashboard/RoutesComp';
import Sidebar from './components/dashboard/Sidebar';
import Jobs from './components/dashboard/Jobs';


import MasterPortfolioComp from './components/portfolio/MasterPortfolioComp';

import Home from './components/Home';
import IsAnon from './components/auth/IsAnon';
import IsPrivate from './components/auth/IsPrivate';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';



import Nav from './components/Nav';
import DashNav from './components/dashboard/DashNav';
import SignUp from './components/auth/SignUp';
import Users from './components/dashboard/Users';
import TrackJob from './components/dashboard/TrackJob';
import TrackedJobs from './components/dashboard/TrackedJobs';




const App = () => {
  // const [dashboardActive, setDashboardActive] = useState(() => {
  //   const storedState = localStorage.getItem('dashboardActive');
  //   return storedState ? storedState : false;
  // });
  const [dashboardActive, setDashboardActive] = useState(false);
  const routes = RoutesComp();


  // const location = useLocation();
  // used window.location because useLocation was not working
  const isDashboardPage = window.location.pathname.startsWith('/users')


  return (
    <Router>
      <header>
        <Nav />
      </header>
      {
      isDashboardPage &&
      dashboardActive &&
      (
        <DashNav routes={routes} />
      )}
      <div className="section">
        <div className="container">
          <div className="columns">
            {
            isDashboardPage &&
            dashboardActive
            && (
              <div className="column is-one-quarter">
                <Sidebar />
              </div>
            )}
            <div className="column">
              <Routes>
                <Route exact path="/" element={<Home setDashboardActive={setDashboardActive} />} />
                <Route path="/portfolios/:uniqueIdentifier" element={<MasterPortfolioComp setDashboardActive={setDashboardActive} />} />
                <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
                <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="password-reset" element={<PasswordResetForm />} />
                {/* DashBoard componentx */}
                <Route path="/users/:uniqueIdentifier/dashboard" element={<IsPrivate><Dashboard setDashboardActive={setDashboardActive} dashboardActive = {dashboardActive} /></IsPrivate>} />
                <Route exact path="/users" element={<IsPrivate><Users /></IsPrivate>} />
                <Route path="/messages" element={<IsPrivate><Messages /></IsPrivate>} />
                <Route path = "/jobs" element = {<IsPrivate><Jobs/></IsPrivate>}/>
                <Route path = "/jobs/track" element = {<IsPrivate><TrackJob /></IsPrivate>}/>
                <Route path = "jobs/tracked-jobs" element = { <IsPrivate><TrackedJobs /></IsPrivate>}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
