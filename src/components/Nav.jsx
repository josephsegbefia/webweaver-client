/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  function toggleBurgerMenu() {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  }

  return (
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-size-4">WebWeaver</Link>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic"
          onClick={toggleBurgerMenu}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-end">
          <Link to="/projects" className="navbar-item" onClick={toggleBurgerMenu}>Projects</Link>
          <Link to="/login" className="navbar-item" onClick={toggleBurgerMenu}>Login</Link>
          <Link to="/" className="navbar-item" onClick={toggleBurgerMenu}>Home</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav
