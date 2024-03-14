/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import AddProject from './AddProject';
import { AuthContext } from '../../context/auth.context';
import './project.css'
import { useParams } from 'react-router-dom';


const Project = ({ projects }) => {

  const [addProjectFormOpen, setAddProjectFormOpen] = useState(false);

  const { user, isLoggedIn } = useContext(AuthContext);

  const { uniqueIdentifier } = useParams();
  console.log(uniqueIdentifier);

  const checkOwner = () => {
    if(user){
      if((user.uniqueIdentifier === uniqueIdentifier) & isLoggedIn){
        return true;
      }
    }
    false;
  }

  // console.log(checkOwner());
  const handleOpenAddProjectForm = () => {
    setAddProjectFormOpen(true);
  }

  const handleCloseAddProjectForm = () => {
    setAddProjectFormOpen(false);
  }



  return (
    <div className="container">
      <p className = "title is-size-1 my-6 has-text-centered">Projects</p>
      <hr />
      <div className="columns is-multiline">
        {projects.map((project, index) => (
          <div key={index} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="title">{project.title}</p>
                <p className="subtitle">{project.shortDesc}</p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span>
                    View on <a href={project.imgUrl}>Twitter</a>
                  </span>
                </p>
                <p className="card-footer-item">
                  <span>
                    Share on <a href={project.imgUrl}>Facebook</a>
                  </span>
                </p>
              </footer>
            </div>
          </div>
        ))}
        {checkOwner() && (
          <div className = "column is-one-third">
          <div className="card">
            <div className="card-content">
              <button className="title is-size-1 has-text-centered is-success" onClick={handleOpenAddProjectForm}>+</button>
              <p className="subtitle"></p>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                {/* <span>
                  View on <a href={project.imgUrl}>Twitter</a>
                </span> */}
              </p>
              <p className="card-footer-item">
                {/* <span>
                  Share on <a href={project.imgUrl}>Facebook</a>
                </span> */}
              </p>
            </footer>
          </div>
        </div>
        )}
      </div>
      {addProjectFormOpen && <AddProject onClose={handleCloseAddProjectForm} />}
    </div>
  );
};

export default Project;
