/* eslint-disable no-unused-vars */
import React,{useState, useRef, useEffect} from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const TrackJob = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };


  return (
    <div className = "container">
      <div>
        <h1 className = "title is-size-5 has-text-centered mb-5">Provide Job Details for tracking</h1>
        <hr />
      </div>
      <form>
        <div className = "columns">
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Company Name"
                  // value={schoolName}
                  // onChange={(e) => setSchoolName(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Position"
                  // value={schoolName}
                  // onChange={(e) => setSchoolName(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Job Location"
                  // value={schoolName}
                  // onChange={(e) => setSchoolName(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className = "columns">
          <div className = "column">
            <textarea
              className = "textarea"
              placeholder = "Provide a brief description of the job"
            />
          </div>
        </div>
        <div className = "columns">
          <div className = "column is-half">
            <div className="select is-fullwidth">
              <select
                // value = {selectedEdType}
                // onChange = {(e) => setSelectedEdType(e.target.value)}
              >
                <option>Application Status</option>
                <option>Not applied</option>
                <option>Application withdrawn</option>
                <option>Initial Call</option>
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Landed</option>
                <option>Rejected</option>
                <option>No contact</option>
              </select>
            </div>
          </div>
            <div className = "column is-half">
              <div className="field">
                {/* <label className="label">Select Start Date:</label> */}
                  <div className = "control">
                    <Flatpickr
                      className="input"
                      placeholder='Applied date'
                      // value={selectedStartDate}
                      // onChange={handleStartDateChange}
                      options={{
                        dateFormat: 'Y-m-d',
                        altInput: true,
                        altFormat: 'F j, Y',
                        // defaultDate: selectedStartDate
                      }}
                    />
                  </div>
              </div>
          </div>
        </div>
        <h1 className = "title is-size-7 has-text-danger">Please add the documents used for the application below. Hit the plus button after each file selection.</h1>
        <div className = "columns">
          <div className = "column is-one-third">
            <p className = "is-size-7 my-4">Curriculum Vitae (CV)</p>
            <div className = "columns">
              <div className = "column is-two-thirds">
                <div className ="file">
                  <label className ="file-label">
                    <input className ="file-input" type="file" name="resume" />
                    <span className ="file-cta">
                      <span className ="file-icon">
                        <i className ="fas fa-upload"></i>
                      </span>
                      <span className ="file-label"> Choose a file… </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className = "column">
                <button className = "button is-success"><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div className = "column is-one-third">
            <p className = "is-size-7 my-4">Cover Letter</p>
            <div className = "columns">
              <div className = "column is-two-thirds">
                <div className ="file">
                  <label className ="file-label">
                    <input className ="file-input" type="file" name="resume" />
                    <span className ="file-cta">
                      <span className ="file-icon">
                        <i className ="fas fa-upload"></i>
                      </span>
                      <span className ="file-label"> Choose a file… </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className = "column">
                <button className = "button is-success"><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div className = "column is-one-third">
            <p className = "is-size-7 my-4">Supporting docs</p>
            <div className = "columns">
              <div className = "column is-two-thirds">
                <div className ="file">
                  <label className ="file-label">
                    <input className ="file-input" type="file" multiple name="other" />
                    <span className ="file-cta">
                      <span className ="file-icon">
                        <i className ="fas fa-upload"></i>
                      </span>
                      <span className ="file-label"> Choose a file… </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className = "column">
                <button className = "button is-success"><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className = "columns">
          <div className = "column is-one-third">
            <button type = "submit" className = "action button is-primary">Track</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default TrackJob
