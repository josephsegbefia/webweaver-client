/* eslint-disable no-unused-vars */
import React from 'react';
import ProjectList from './components/ProjectList';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import PasswordResetForm from './components/auth/PasswordResetForm';
import PortfolioPage from './components/portfolio/PortfolioPage';
import CreatePortfolio from './components/portfolio/CreatePortfolio';
import Home from './components/Home';
import IsAnon from './components/auth/IsAnon';
import IsPrivate from './components/auth/IsPrivate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Nav from './components/Nav';
import SignUp from './components/auth/SignUp';
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
            <Route path = '/portfolios/' element = {<CreatePortfolio />} />
            <Route path = '/projects' element = {<ProjectList />} />
            <Route path = '/login' element = { <IsAnon> <Login /> </IsAnon> } />
            <Route path = '/signup' element = {<IsAnon> <SignUp /> </IsAnon>} />
            <Route path = '/verify-email' element = {<VerifyEmail />} />
            <Route path = '/forgot-password' element = {<ForgotPasswordForm />} />
            <Route path = 'password-reset' element = {<PasswordResetForm />} />
            {/* <Route path = '/' element = { <Profile /> } /> */}
          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
