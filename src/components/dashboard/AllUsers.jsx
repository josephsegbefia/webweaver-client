/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const AllUsers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    axios.get(`${API_URL}api/users`)
      .then((response) => {
        console.log(response.data.users)
        setCustomers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchCustomers()
  }, []);


  return (
    <div className = "container">
      <h1>All Users</h1>

      <table className="table is-fullwidth my-5">
        <thead>
          <tr>
            <th className = 'is-size-7'>First Name</th>
            <th className = 'is-size-7'>Last Name</th>
            <th className = 'is-size-7'>Email</th>
            <th className = 'is-size-7'>Role</th>
            <th className = 'is-size-7'>UniqID</th>
            <th className = 'is-size-7 has-text-centered'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className = 'is-size-7'>{customer.firstName}</td>
              <td className = 'is-size-7 mr-4'>{customer.lastName}</td>
              <td className = 'is-size-7 mr-4'>{customer.email}</td>
              <td className = 'is-size-7'>{customer.isAdmin ? 'ADMIN' : 'Regular user'}</td>
              <td className = 'is-size-7'>{customer.uniqueIdentifier}</td>
              <td>
                <div className="buttons">

                  <button className="button is-primary is-small">View</button>
                  <button className="button is-warning is-small">Edit</button>
                  <button className="button is-danger is-small">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers;
