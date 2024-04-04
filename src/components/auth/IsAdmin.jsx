/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

function IsAdmin({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  if(!isLoggedIn && !user.isAdmin){
    return <Navigate to = '/' />
  } else {
    return children;
  }
}

export default IsAdmin;
