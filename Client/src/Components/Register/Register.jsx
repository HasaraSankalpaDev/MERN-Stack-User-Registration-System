import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Register.css';

function Register() {
    const navigate = useNavigate();

    const [logError, setLogError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState({
        uName: "",
        uEmail: "",
        uPass: "",
        uType: "User",
    });

    // Handle Inputs
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest();
            console.log(response);

            if (response?.message === "All fields are required") {
                setLogError(true);
                setErrorMessage("All Fields Are Required");
            } else if (response?.error === "User already exists") {
                setLogError(true);
                setErrorMessage("User Already Exists. Please use another username or email address.");
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error("Error: ", err);
            setLogError(true);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    // Function to send the registration request
    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:8000/register", {
                uName: user.uName,
                uEmail: user.uEmail,
                uPass: user.uPass,
                uType: "User",
            });

            return response.data;
        } catch (error) {
            // Log the error and re-throw it for handling in handleSubmit
            console.error("Error occurred during the request:", error);
            throw new Error(error.response?.data?.message || "Request failed");
        }
    };

    return (
        <div>
            <Nav />
            <div className="container">
                <h3 className='mt-5'>User Registration Page</h3>
                <form className='mt-5' onSubmit={handleSubmit}>
                    {logError && (
                        <div className="mb-3 w-50">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Oops!</strong> {errorMessage}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div>
                    )}

                    <div className="mb-3 w-50">
                        <label htmlFor="uName" className="form-label">Your Name</label>
                        <input
                            type="text"
                            onChange={handleInput}
                            name="uName"
                            value={user.uName}
                            className="form-control rounded-0 border-0 outline-0 py-2"
                            id="uName"
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="uEmail" className="form-label">Email address</label>
                        <input
                            type="email"
                            onChange={handleInput}
                            name="uEmail"
                            value={user.uEmail}
                            className="form-control rounded-0 border-0 outline-0 py-2"
                            id="uEmail"
                            placeholder="Enter Your Email Address"
                        />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="uPass" className="form-label">Password</label>
                        <input
                            type="password"
                            onChange={handleInput}
                            name="uPass"
                            value={user.uPass}
                            className="form-control rounded-0 border-0 outline-0 py-2"
                            id="uPass"
                            placeholder="Enter Your Password"
                        />
                    </div>
                    <div className='w-50'>
                        <button className='btn btn-light w-100 rounded-0 outline-0 border-0 text-white py-2 mt-2'>
                            Register Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
