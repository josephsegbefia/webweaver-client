/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className = 'navbar is-success' role='navigation' aria-label = 'main navigation'>
      <div className = 'navbar-menu'>
        <div className = 'navbar-end'>
          <Link to = '/login' className = 'navbar-item'>Login</Link>
          <Link to = '/projects' className = 'navbar-item'>Projects</Link>

        </div>
        <div className = 'navbar-end'></div>

        {/* <div className = 'navbar-end'>
          <div className = 'navbar-item'>
            <div className = 'buttons'>
              <Link to ='/signout' className = 'button is-light'>
                Sign Out
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  )
}

export default Nav
