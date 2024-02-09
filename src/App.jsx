/* eslint-disable no-unused-vars */
import React from 'react';
import ProjectList from './components/ProjectList';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Nav from './components/Nav';
import SignUp from './components/SignUp';
const App = () => {
  return (
    <div>
      <Router>
        <header>
          <Nav />
        </header>
        <div className = 'column'>
          <Routes>
            {/* <Route path = '/signout' element = {<SignOut />} /> */}
            <Route path = '/projects' element = {<ProjectList />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/signup' element = {<SignUp />} />
            <Route path = '/email-verification' element = {<VerifyEmail />} />
            {/* <Route path = '/' element = { <Profile /> } /> */}
          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
