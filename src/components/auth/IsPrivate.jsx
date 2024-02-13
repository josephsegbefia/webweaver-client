/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';


function IsPrivate( { children } ) {
  const { isLoggedIn } = useContext(AuthContext);

  if(!isLoggedIn){
    return <Navigate to = '/login' />;
  } else {
    return children;
  }
}

export default IsPrivate;
