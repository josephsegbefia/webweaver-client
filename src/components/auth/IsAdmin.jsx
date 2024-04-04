/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

function IsAdmin({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext);


  let isAdmin;

  if(user){
    isAdmin = user.isAdmin;
  }

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsAdmin;
