/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Project = ({ projects }) => {
  return (
    // <div className="tile is-ancestor">
      // <div className="tile is-12 is-horizontal is-parent">
      <div className = "container">
        <div className="is-inline-flex">
          {projects.map((project, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={project.imgUrl} alt="project" />
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>

      // </div>
    // </div>
  );
};

export default Project;
