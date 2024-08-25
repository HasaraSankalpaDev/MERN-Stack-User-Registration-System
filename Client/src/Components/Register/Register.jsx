import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios';
import Nav from '../Nav/Nav'
import './Register.css'

function Register() {

    // Create User Navigate Function
    const Navigate = useNavigate();

    //Set Register Data
    const [user, setUser] = useState({
        uName: "",
        uEmail: "",
        uPass: ""
    })

    // Handle Inputs
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        sendRequest().then(() => {
            alert("User Registered Successfully");
            Navigate('/login');
        }).catch((err) => {
            alert("Error :" + err);
        })
    }

    const sendRequest = async (req, res) => {
        try {
            const response = await axios.post("http://localhost:8000/register", {
                uName: user.uName,
                uEmail: user.uEmail,
                uPass: user.uPass,
            });
            alert("Registered Successfully");
            return response.data; // Handle the response data
        } catch (error) {
            console.error("Error occurred during the request:", error);
            alert(error);
            throw error; // Optionally, handle the error as needed
        }
    };

    return (
        <div>
            <Nav />
            <div className="container">
                <h3 className='mt-5'>User Registration Page</h3>
                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className="mb-3 w-50">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Your Name</label>
                        <input type="text" onChange={handleInput} name="uName" value={user.uName} className="form-control rounded-0 border-0 outline-0 py-2" id="exampleFormControlInput1" placeholder="Enter Your Name" />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" onChange={handleInput} name="uEmail" value={user.uEmail} className="form-control rounded-0 border-0 outline-0 py-2" id="exampleFormControlInput1" placeholder="Enter Your Email Address" />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                        <input type="password" onChange={handleInput} name="uPass" value={user.uPass} className="form-control rounded-0 border-0 outline-0 py-2" id="exampleFormControlInput1" placeholder="Enter Your Password" />
                    </div>
                    <div className='w-50'>
                        <button className='btn btn-light w-100 rounded-0 outline-0 border-0 text-white py-2 mt-2'>Register Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
