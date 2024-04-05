/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';


const HomeCard = ({headline, title, imgSrc, contents }) => {
  return (
    <div className = "card-container">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src= {imgSrc}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className = "title is-size-5 has-text-primary has-text-centered">{title}</p>
          <p className = "subtitle is-size-6 mb-3 p-3">{headline}</p>
          <hr />
          <ul>
            {contents && contents.map((content, index) => (
              <li key = {index} style={{textAlign: "left", }}><i className = "fa-solid fa-circle-check mr-3" style = {{color: "green"}}></i>{content}</li>
            ))}
          </ul>

          <div className="content">

            <br />

          </div>
        </div>
      </div>
    </div>

  );
};

export default HomeCard;
