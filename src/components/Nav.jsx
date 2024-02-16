/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context'

const Nav = () => {
  const [activeItem, setActiveItem] = useState('');

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  function toggleBurgerMenu() {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  }

  console.log(user)
  return (
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item is-size-4">WebWeaver</NavLink>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic"
          onClick={toggleBurgerMenu}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-end">
          {isLoggedIn && (
            <>
              <NavLink to = "/projects"  className="navbar-item" onClick={toggleBurgerMenu}>Projects</NavLink>
              <NavLink  className = 'navbar-item' onClick={toggleBurgerMenu}>Dashboard</NavLink>
              <NavLink className = 'navbar-item' onClick={logOutUser}>Log out</NavLink>
            </>
          )}
          {
            !isLoggedIn && (
              <NavLink to="/login"  className="navbar-item" onClick={toggleBurgerMenu}>Login</NavLink>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Nav
