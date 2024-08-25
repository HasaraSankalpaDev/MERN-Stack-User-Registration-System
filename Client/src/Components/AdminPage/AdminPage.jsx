import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Nav from '../Nav/Nav'
import axios from "axios"


function AdminPage() {

  const [regUsers, setRegUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/register/");
        setRegUsers(response.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  }, []); // Empty array means it will run once after the first render


  console.log(regUsers);
  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h3>Admin Page</h3>
        <div className='my-5'>
          <table className="table py-4 px-5">
            <thead className=''>

              <tr>
                <th scope="col" className='py-3 px-3'>Name</th>
                <th scope="col" className='py-3'>Email Address</th>
                <th scope="col" className='py-3'>Type</th>
              </tr>
            </thead>
            <tbody>

              {regUsers.map((user) => (

                <tr>
                  <th scope="row" className='px-3'>{user.uName}</th>
                  <td>{user.uEmail}</td>
                  <td>{user.uPass}</td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default AdminPage
