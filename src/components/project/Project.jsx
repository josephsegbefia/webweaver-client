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
            {projects.map((project) => (
              <div key={project._id} className="column is-one-third">
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
          </div>
          <div className="columns">
            <div className="column is-half">
              <button className="button action is-warning" onClick={previous} disabled = {currentPage === 1}>Previous</button>
            </div>
            <div className="column is-half">
              <button className="button action is-primary" onClick={next} disabled = {currentPage === totalPages}>Next</button>
            </div>
          </div>
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
