/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const JobDetails = ({ onClose, jobId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [cv, setCV] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [otherDocs, setOtherDocs] = useState([]);

  const {user} = useContext(AuthContext);

  let uniqueIdentifier;
  user && (uniqueIdentifier = user.uniqueIdentifier);


  const API_URL = import.meta.env.VITE_API_URL;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const fetchJob = async () => {
    try {
      const response = await axios.get(`${API_URL}api/portfolios/${uniqueIdentifier}/jobs/${jobId}`);
      const data = response.data;
      setCompanyName(data.companyName);
      setPosition(data.position);
      setLocation(data.jobLocation);
      setDescription(data.jobDescription);
      setStatus(data.status);
      setCV(data.cv);
      setCoverLetter(data.coverLetter);
      setAppliedDate(data.appliedDate);
      setOtherDocs(data.otherDocs);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJob()
  }, [uniqueIdentifier, jobId]);


  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  console.log(jobId);
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className = "card">
          <div className = "card-content">
            <h1 className = "title is-size-6">{position} @ {companyName}</h1>
            <p className = "mb-3">{location}</p>
            <p className = "is-size-7 has-text-success mb-3">{formatDate(appliedDate)}</p>
            <p>Status: {status}</p>
            <hr />
            <p>{description}</p>
          </div>
          <div className = "card-footer is-size-7">
            <p className="card-footer-item" onClick={handleClose}>
              <a href= {cv} target="_blank" rel="noopener noreferrer">
                <span>
                  CV
                </span>
              </a>
            </p>
            <p className="card-footer-item" onClick={handleClose}>
              <a href= {coverLetter} target="_blank" rel="noopener noreferrer">
                <span>
                  Cover Letter
                </span>
              </a>
            </p>
            {
              otherDocs.length > 0 && (
                otherDocs.map((doc, index) => {
                  return (
                    <>
                      <p className="card-footer-item" onClick={handleClose}>
                        <a href={doc} target="_blank" rel="noopener noreferrer">
                          <span>
                            Doc - {index}
                          </span>
                        </a>
                      </p>
                    </>
                  )
                })
              )
            }

          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
  )
}

export default JobDetails
