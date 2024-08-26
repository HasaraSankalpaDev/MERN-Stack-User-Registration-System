import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Register.css';

function Register() {
    // Create User Navigate Function
    const navigate = useNavigate();

    // Error Handling
    const [logError, setLogError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    // Set Register Data
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
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then((response) => {
                console.log(response);
                if (response.error === "User already exists") {
                    setLogError(true);
                    setErrorMessage("User Already Exist Please User Another User Name Or Email Address")
                } else {
                    navigate('/login'); // navigate to the login page
                }
            })
            .catch((err) => {
                alert("Error: " + err.message);
            });
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
            return response.data; // Return the response data
        } catch (error) {
            console.error("Error occurred during the request:", error);
            throw error; // Handle the error
        }
    };

    return (
        <div>
            <Nav />
            <div className="container">
                <h3 className='mt-5'>User Registration Page</h3>
                <form className='mt-5' onSubmit={handleSubmit}>
                    {logError ? (
                        <div className="mb-3 w-50">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Oops!</strong> {errorMessage}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div>
                    ) : (
                        <div />
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
