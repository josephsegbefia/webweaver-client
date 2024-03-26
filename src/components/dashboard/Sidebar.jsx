/* eslint-disable no-unused-vars */
import React from 'react';
import RoutesComp from './RoutesComp';
import { NavLink, useLocation } from 'react-router-dom';


const Sidebar = () => {
  const routes = RoutesComp();
  const location = useLocation();
  const areaRoute = routes.find(route => route.url === `/${location.pathname.split('/')[1]}`);

  return (
      <aside className="menu">
          <p className="menu-label">
              {areaRoute && areaRoute.name}
          </p>
          <ul className="menu-list">
              {
                  areaRoute &&
                  areaRoute.subnav &&
                  areaRoute.subnav.map((route,index) => (
                      <li key = {index}>
                          <NavLink to={`${areaRoute.url}${route.url}`}
                            // activeClassName="is-active"
                          >
                              {route.name}
                          </NavLink>
                      </li>
                  ))
              }
          </ul>
      </aside>
  );
}

export default Sidebar
