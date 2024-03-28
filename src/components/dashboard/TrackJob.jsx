/* eslint-disable no-unused-vars */
import React,{useState, useRef, useEffect} from 'react';
import axios from "axios";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const API_URL = import.meta.env.VITE_API_URL;

const TrackJob = () => {
  // Supporting Docs upload
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [otherDocs, setOtherDocs] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // CV Upload
  const [cv, setCv] = useState("");
  const [upLoadingCV, setUploadingCV] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null)

  // Cover Letter Upload
  const [coverLetter, setCoverLetter] = useState("");
  const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false)
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);


  // Handle upload for supporting docs - Multiple files

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleFileUpload = async () => {
    setUploadingFiles(true);
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`otherDocs`, file);
    });

    try {
      const response = await axios.post(`${API_URL}api/supporting-documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setOtherDocs(response.data.fileUrls);
      setUploadingFiles(false)
      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadingFiles(false);
    }
  };

  // Handle CV upload
  const handleCVChange = (e) => {
    setSelectedCV(e.target.files[0]);
  }

  const handleCVUpload = async () => {
    setUploadingCV(true);
    const formData = new FormData();
    formData.append('cv', selectedCV);

    try {
      const response = await axios.post(`${API_URL}api/resume/upload`, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setCv(response.data.fileUrl)
      setUploadingCV(false);
    }catch(error){
      console.log(error)
      setUploadingCV(false);
    }
  }

  // Handle cover letter  upload
  const handleCoverLetterChange = (e) => {
    setSelectedCoverLetter(e.target.files[0]);
  }

  const handleCoverLetterUpload = async () => {
    setUploadingCoverLetter(true);
    const formData = new FormData();
    formData.append('coverLetter', selectedCoverLetter);

    try {
      const response = await axios.post(`${API_URL}api/cover-letter/upload`, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setCoverLetter(response.data.fileUrl)
      setUploadingCoverLetter(false);
    }catch(error){
      console.log(error)
      setUploadingCV(false);
    }
  }




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
                    <input className ="file-input" type="file" name="resume" onChange={handleCVChange}/>
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
                <button type = "button" className = "button is-success"><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div className = "column is-one-third">
            <p className = "is-size-7 my-4">Cover Letter</p>
            <div className = "columns">
              <div className = "column is-two-thirds">
                <div className ="file">
                  <label className ="file-label">
                    <input className ="file-input" type="file" name="cover-letter" onChange={handleCoverLetterChange}/>
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
                <button type = "button" className = "button is-success"><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div className = "column is-one-third">
          {
            uploadingFiles &&
            (
              <progress className='progress is-medium is-link' max='100' style={{ height: '1px' }}>
                60%
              </progress>
              )}
            <p className = "is-size-7 my-4">Supporting docs</p>
            <div className = "columns">
              <div className = "column is-two-thirds">
                <div className ="file">
                  <label className ="file-label">
                    <input className ="file-input" type="file" multiple name="other" onChange = {handleFileChange} />
                    <span className ="file-cta">
                      <span className ="file-icon">
                        <i className ="fas fa-upload"></i>
                      </span>
                      <span className ="file-label"> Choose files… </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className = "column">
                <button type = "button" className = "button is-success" onClick={handleFileUpload}><i className = "fa-solid fa-plus"></i></button>
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
