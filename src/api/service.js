/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;


const mainAPI = axios.create({
  baseURL: API_URL,
  // withCredentials: true
});

const authAPI = axios.create({
  baseURL: AUTH_URL,
})

const errorHandler = (error) => {
  throw error;
};

const signup = (requestBody) => {
  return authAPI.post('signup', requestBody)
    .then(res => res.data)
    .catch(errorHandler);
}

export default {
  signup,
}
