/* eslint-disable no-unused-vars */
// routes.js

import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

import Users from './Users';
import CreateUser from './CreateUser';
import Dashboard from './Dashboard';
import CreateCV from './CreateCV';
import EditUser from './EditUser';
import TrackJob from './TrackJob';
import MasterPortfolioComp from '../portfolio/MasterPortfolioComp';

const RoutesComp = () => {
  const { user } = useContext(AuthContext); // Access user context value

  const uniqueIdentifier = user && user.uniqueIdentifier;

  const routes = [
    {
      name: "Portfolio",
      url: `/portfolios/${uniqueIdentifier}`,
      component: MasterPortfolioComp
    },
    {
      name: "Users",
      url: "/users",
      exact: true,
      component: Users,
      sunbav :[
        {
          name: "Create a user",
          url: "/create",
          component: CreateUser
        },
        {
          name: "Edit user",
          url: "/:id",
          component: EditUser
        }
      ]
    },
    {
      name: "Create CV",
      url: "/create-cv",
      component: CreateCV
    },
    {
      name: "Track Job",
      url: "/track-job",
      component: TrackJob
    }
  ];

  return routes;
};

export default RoutesComp;
