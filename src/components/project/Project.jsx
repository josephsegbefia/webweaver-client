/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import AddProject from './AddProject';
import { AuthContext } from '../../context/auth.context';
import './project.css';
import { useParams } from 'react-router-dom';

const Project = ({ projects, next, previous, loading, totalPages, currentPage }) => {
  const [addProjectFormOpen, setAddProjectFormOpen] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { uniqueIdentifier } = useParams();
  console.log(uniqueIdentifier);

  const checkOwner = () => {
    if (user) {
      if (user.uniqueIdentifier === uniqueIdentifier && isLoggedIn) {
        return true;
      }
    }
    return false;
  };

  const handleOpenAddProjectForm = () => {
    setAddProjectFormOpen(true);
  };

  const handleCloseAddProjectForm = () => {
    setAddProjectFormOpen(false);
  };

  return (
    <div className="container">
      <p className="title is-size-1 my-6 has-text-centered">Projects</p>
      <hr />

      {loading ? (
        <div className="columns is-vcentered">
          <div className="column">
            <progress className='progress is-medium is-link' max='100'>
              60%
            </progress>
          </div>
        </div>
      ) : (
        <div>
          <div className="columns is-multiline">
            {projects.length !== 0 && projects.map((project) => (
              <div key={project._id} className="column is-one-third">
                <div className="card">
                  <div className="card-content">
                    <p className="title">{project.title}</p>
                    <p className="subtitle">{project.shortDesc}</p>
                    {project.techsUsed.map((tech, index) => {
                      return (
                        <div key = {index} className = 'is-inline-flex'>
                          <span className = 'tag is-success is-light mr-3'>{tech}</span>
                        </div>
                      )
                    })}
                  </div>
                  <footer className="card-footer">
                    <p className="card-footer-item">
                      <span>
                        <i className = "fa-solid fa-up-right-and-down-left-from-center"></i>
                      </span>
                    </p>
                    <p className="card-footer-item">
                      <span>
                      <i className = "fa-regular fa-eye"></i>
                      </span>
                    </p>
                    <p className="card-footer-item">
                      <span>
                        <i className = "fa-brands fa-github"></i>
                      </span>
                    </p>
                  </footer>
                </div>
              </div>
            ))}
          </div>
          {projects.length !== 0 && (
            <div className="columns">
              <div className="column is-half">
                <button className="button action is-warning" onClick={previous} disabled = {currentPage === 1}>Previous</button>
              </div>
              <div className="column is-half">
                <button className="button action is-primary" onClick={next} disabled = {currentPage === totalPages}>Next</button>
              </div>
            </div>
          )}
          {projects.length === 0 && (
            <div className = "columns is-centered is-vcentered">
              <div className = "column is-half has-text-centered">
                <p className = "has-text-danger is-size-5">No Projects yet</p>
              </div>
            </div>
          )}

          <div className="columns">
            <div className="column">
              {checkOwner() && (
                <div>
                  <button className="button is-primary" onClick={handleOpenAddProjectForm}>+ Add Project</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {addProjectFormOpen && <AddProject onClose={handleCloseAddProjectForm} />}
    </div>
  );
};

export default Project;
