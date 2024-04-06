/* eslint-disable no-unused-vars */
import React,{useState, useRef, useEffect, useContext} from 'react';
import axios from "axios";
import { AuthContext } from '../../context/auth.context';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const API_URL = import.meta.env.VITE_API_URL;

const TrackJob = () => {
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined)

  // company name, position, description, date applied fields
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [appliedDate, setAppliedDate] = useState("")

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

  // Data from context
  const { user } = useContext(AuthContext);
  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);


  // FUNCTIONS //

  const checkFields = () => {
    if(companyName === '' || position === '' || location === '' || description === '' || appliedDate === ''){
      return true;
    }
    false;
  }
  // Close form submission success notification
  const closeNotification = () => {
    setSubmitted(false);
  }

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
      const response = await axios.post(`${API_URL}api/resume/upload`, formData)
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
      const response = await axios.post(`${API_URL}api/coverletter/upload`, formData)
      console.log(response.data)
      setCoverLetter(response.data.fileUrl)
      setUploadingCoverLetter(false);
    }catch(error){
      console.log(error)
      setUploadingCV(false);
    }
  }


  // Handle date change
  const handleDateChange = (date) => {
    setAppliedDate(date[0]);
  }


  // Form Submission
  const handleFormSubmission = (e) => {
    e.preventDefault();

    setSaving(true);

    const storedToken = localStorage.getItem('authToken');

    const requestBody = {
      companyName,
      jobLocation:location,
      position,
      jobDescription:description,
      appliedDate,
      status,
      cv:cv,
      coverLetter:coverLetter,
      otherDocs:otherDocs
    }

    console.log(requestBody);

    axios.post(`${API_URL}api/portfolios/${uniqueIdentifier}/jobs`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          console.log(response.data)
          setSuccessMessage(response.data.message);
          setSubmitted(true);
          setSaving(false);
          setCompanyName("");
          setLocation("");
          setDescription("");
          setCoverLetter("");
          setCv("");
          setOtherDocs("");
          setAppliedDate("");
          setStatus("");
          setPosition("")
        })
        .catch((error) => {
          setSaving(false);
          console.log(error);
        })
  }

  return (
    <div className = "container">
      <div>
        <h1 className = "title is-size-5 has-text-centered mb-5">Provide Job Details for tracking</h1>
        <hr />
        {submitted && (
          <article className="message is-success my-4">
            <div className="message-header">
              <p>Success</p>
              <button onClick = {closeNotification} className="delete" aria-label="delete"></button>
            </div>
            <div className = "message-body">
              {successMessage}
            </div>
          </article>
        )}
      </div>
      <form onSubmit = {handleFormSubmission}>
        {saving && (
          <progress className='progress is-medium is-link' max='100' style={{ height: '3px' }}>
            60%
          </progress>
        )}
        <div className = "columns">
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className = "column is-one-third">
            <div className="field">
              <p className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Job Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
              value = {description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className = "columns">
          <div className = "column is-half">
            <div className="select is-fullwidth">
              <select
                value = {status}
                onChange = {(e) => setStatus(e.target.value)}
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
                      className="input is-primary"
                      placeholder='Applied date'
                      value={appliedDate}
                      onChange={handleDateChange}
                      options={{
                        dateFormat: 'Y-m-d',
                        altInput: true,
                        altFormat: 'F j, Y',
                        defaultDate: appliedDate
                      }}
                    />
                  </div>
              </div>
          </div>
        </div>
        <h1 className = "title is-size-7 has-text-danger">Please add the documents used for the application below. Hit the plus button after each file selection.</h1>
        <div className = "columns">
          <div className = "column is-one-third">
            {
              upLoadingCV && (
                <progress className='progress is-medium is-link' max='100' style={{ height: '1px' }}>
                  60%
                </progress>
              )
            }
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
                {cv && (
                  <p className = "is-size-7 my-3 has-text-success">File uploaded</p>
                )}

              </div>
              <div className = "column">
                <button type = "button" className = "button is-success" onClick={handleCVUpload} disabled={selectedCV === null}><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div className = "column is-one-third">
            {
              uploadingCoverLetter && (
                <progress className='progress is-medium is-link' max='100' style={{ height: '1px' }}>
                  60%
                </progress>
              )
            }
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
                {coverLetter && (
                  <p className = "is-size-7 my-3 has-text-success">File uploaded</p>
                )}
              </div>
              <div className = "column">
                <button type = "button" className = "button is-success" onClick={handleCoverLetterUpload} disabled={selectedCoverLetter === null}><i className = "fa-solid fa-plus"></i></button>
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
                {otherDocs.length > 0 && (
                  <p className = "is-size-7 my-3 has-text-success">Files uploaded</p>
                )}
              </div>
              <div className = "column">
                <button type = "button" className = "button is-success" onClick={handleFileUpload} disabled={selectedFiles.length === 0}><i className = "fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className = "columns">
          <div className = "column is-one-third">
            <button type = "submit" className = "action button is-primary" disabled = {saving || checkFields()}>Track</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default TrackJob
