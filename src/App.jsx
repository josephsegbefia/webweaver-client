/* eslint-disable no-unused-vars */
import React from 'react';
import ProjectList from './components/ProjectList';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail'
import ForgotPasswordForm from './components/ForgotPasswordForm';
import PasswordResetForm from './components/PasswordResetForm';
import Home from './components/Home';
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
            <Route path = '/' element = {<Home />}/>
            <Route path = '/projects' element = {<ProjectList />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/signup' element = {<SignUp />} />
            <Route path = '/verify-email' element = {<VerifyEmail />} />
            <Route path = '/forgot-password' element = {<ForgotPasswordForm />} />
            <Route path = 'password-reset' element = {<PasswordResetForm />}/>
            {/* <Route path = '/' element = { <Profile /> } /> */}
          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
