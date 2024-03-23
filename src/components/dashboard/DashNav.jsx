/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubNav = ({ routes, parentRoutePath }) => (
  <>
    {routes.map((route, index) => (
      <Link key={index} to={`${parentRoutePath}${route.url}`} className="navbar-item">
        {route.name}
      </Link>
    ))}
  </>
);

const DashNav = ({ routes }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className={`navbar-burger burger ${isMenuOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isMenuOpen}
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {routes.map((route, index) => {
            if (route.subnav) {
              return (
                <div key={index} className="navbar-item has-dropdown is-hoverable">
                  <Link to={route.url} className="navbar-link">
                    {route.name}
                  </Link>
                  <div className="navbar-dropdown">
                    <SubNav routes={route.subnav} parentRoutePath={route.url} />
                  </div>
                </div>
              );
            }

            return (
              <Link key={index} to={route.url} className="navbar-item">
                {route.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
