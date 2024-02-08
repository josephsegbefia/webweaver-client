/* eslint-disable no-unused-vars */
import React from 'react';
import ProjectList from './components/ProjectList';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Nav from './components/Nav';
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
            <Route
              path = '/projects'
              element = {<ProjectList />}
            />
            <Route
              path = '/login'
              element = {<Login />}
            />


            {/* <Route path = '/' element = { <Profile /> } /> */}
          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
