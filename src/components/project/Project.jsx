/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Project = ({ projects }) => {
  // Assuming projects is an array of project objects with properties like title, subtitle, and links
  return (
    <div className="container">
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
      </div>
    </div>
  );
};

export default Project;
