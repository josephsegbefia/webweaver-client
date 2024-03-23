/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import PasswordResetForm from './components/auth/PasswordResetForm';
import Dashboard from './components/dashboard/Dashboard';
// import routes from './components/dashboard/routes';
import RoutesComp from './components/dashboard/RoutesComp';
// import EditUserPortfolio from './components/portfolio/EditUserPortfolio';
import MasterPortfolioComp from './components/portfolio/MasterPortfolioComp';
import Home from './components/Home';
import IsAnon from './components/auth/IsAnon';
import IsPrivate from './components/auth/IsPrivate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Nav from './components/Nav';
import DashNav from './components/dashboard/DashNav';
import SignUp from './components/auth/SignUp';
import Users from './components/dashboard/Users';
const App = () => {
  const [dashboardActive, setDashboardActive] = useState(false);
  console.log(dashboardActive);
  const routes = RoutesComp();

  const allRoutes = routes.reduce((routeCollection, currentItem) => {
    routeCollection.push(currentItem);

    if(currentItem.subnav) {
      currentItem.subnav.forEach(item =>
        routeCollection.push(
          {
            ...item,
            url: `${currentItem.url}${item.url}`,
          }
        )
      );
    }

    return routeCollection;
  }, []);

  return (
    <div>
      <Router>
        <header>
          <Nav />
        </header>
        {dashboardActive && (
          <DashNav routes = {routes} />
        )}
        <div className = 'column'>
          <Routes>
            {/* <Route path = '/signout' element = {<SignOut />} /> */}
            <Route path = '/' element = {<Home setDashboardActive = {setDashboardActive} />}/>
            <Route path = '/portfolios/:uniqueIdentifier' element = {<MasterPortfolioComp setDashboardActive = {setDashboardActive}/>} />
            <Route path = '/login' element = { <IsAnon> <Login /> </IsAnon> } />
            <Route path = '/signup' element = {<IsAnon> <SignUp /> </IsAnon>} />
            <Route path = '/verify-email' element = {<VerifyEmail />} />
            <Route path = '/forgot-password' element = {<ForgotPasswordForm />} />
            <Route path = 'password-reset' element = {<PasswordResetForm />} />
            <Route path = '/users' element = {<Users />}/>
            {/* <Route path = '/' element = { <Profile /> } /> */}
            <Route path = '/dashboard' element = {<IsPrivate> <Dashboard setDashboardActive = {setDashboardActive}/> </IsPrivate>}/>
          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
