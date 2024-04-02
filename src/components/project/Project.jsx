/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
// import EditEducation from './EditEducation';
import DeleteConfirmation from './DeleteConfirmation';

const Project = ({ projects, checkOwner, onOpenEditor, openProjectDetails, setProjId, setRefresh, totalPages, currentPage, previous, next }) => {
  const [projectId, setProjectId] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleDeleteNotificationShow = () => {
    setShowDeleteNotification(true);
  };

  const getProjectId = (projId) => {
    setProjectId(projId);
    setProjId(projId);
    onOpenEditor();
  };

  const openDetails = (projId) => {
    setProjectId(projId);
    setProjId(projId)
    openProjectDetails();
  }

  const getPIdAndProj4Del = (projId, name) => {
    setProjectId(projId);
    setProjectTitle(name);
    handleDeleteNotificationShow();
  };

  return (
    <div className="container">
      {showDeleteNotification && <DeleteConfirmation projectId={projectId} setShowDeleteNotification={setShowDeleteNotification} projectTitle = {projectTitle} reload={setRefresh} />}
      <div className="columns is-multiline">
        {projects.length !== 0 && projects
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((project) => (
          <div key={project._id} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="title is-size-5">{project.title}</p>
                <p className="subtitle is-size-6">{project.shortDesc}</p>
                <p className = "is-size-7 my-3 has-text-primary">Added on: {formatDate(project.createdAt)}</p>
                {project.techsUsed.map((tech, index) => (
                  <div key={index} className="is-inline-flex">
                    <span className="tag is-success is-light mr-3">{tech}</span>
                  </div>
                ))}
              </div>
              <footer className="card-footer">
                <p className="card-footer-item" onClick = {() => openDetails(project._id)}>
                  <span>
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  </span>
                </p>
                <p className="card-footer-item">
                  <a href= {project.liveLink} target="_blank" rel="noopener noreferrer">
                    <span>
                      <i className="fa-regular fa-eye"></i>
                    </span>
                  </a>
                </p>
                <p className="card-footer-item">
                  <a href= {project.gitHubLink} target="_blank" rel="noopener noreferrer">
                    <span>
                      <i className="fa-brands fa-github"></i>
                    </span>
                  </a>
                </p>
                {checkOwner && (
                  <>
                    <p className="card-footer-item" onClick={() => getProjectId(project._id)}>
                      <span>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>
                    </p>
                    <p className="card-footer-item has-text-danger" onClick={() => getPIdAndProj4Del(project._id, project.title)}>
                      <span>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </p>
                  </>
                )}
              </footer>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="columns">
          <div className="column is-half">
            <button className="button action is-warning" onClick={previous} disabled={currentPage === 1}>Previous</button>
          </div>
          <div className="column is-half">
            <button className="button action is-primary" onClick={next} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
      {projects.length === 0 && (
        <div className="columns is-centered is-vcentered">
          <div className="column is-half has-text-centered">
            <p className="has-text-danger is-size-5">No Projects yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
