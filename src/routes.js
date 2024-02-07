/* eslint-disable no-unused-vars */
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProjectList from "./components/ProjectList";


const routes = [
  {
    name: 'Login',
    url: '/login',
    component: <Login />
  },
  {
    name: 'Signup',
    url: '/signup',
    component: <SignUp />
  },
  {
    name: 'Project List',
    url: '/projects',
    component: <ProjectList />
  }
]

export default routes;
