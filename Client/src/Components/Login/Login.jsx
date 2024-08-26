import React, { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [logUser, setLogUser] = useState({
    uEmail: "",
    uPass: "",
  });

  // Error Handling
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest();

      // Handle different response statuses
      if (response.status === "ok") {
        // alert("Success");

        // Navigate based on the message
        if (response.message === "Found User") {
          navigate("/view");
        } else if (response.message === "Found Admin") {
          navigate("/admin");
        } else {
          alert("Unknown user type");
        }
      } else if (response.status === "notFound") {
        setErrorMessage("Can not Find User, Please Use Another Email & Password");
        setError(true);
      } else if (response.status === "pwsError") {
        setErrorMessage("Incorrect Password");
        setError(true);
      } else {
        alert("Unexpected response status");
      }

    } catch (err) {
      console.error("Error occurred:", err);
      setErrorMessage("Can not Find User, Please Use Another Email & Password");
      setError(true);
    }
  };

  // Send Request
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        uEmail: logUser.uEmail,
        uPass: logUser.uPass,
      });

      return response.data;
    } catch (error) {
      setErrorMessage(error);
      setError(true);
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h3 className="mt-5">User Login Page</h3>
        <form className="mt-5" onSubmit={handleSubmit}>
          {/* Errors Handling */}
          {error ? <div className="mb-3 w-50">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Oops!</strong> {errorMessage}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div> : <div className="">
           
          </div>}

          <div className="mb-3 w-50">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              onChange={handleInputChange}
              name="uEmail"
              value={logUser.uEmail}
              className="form-control rounded-0 border-0 outline-0 py-2"
              id="exampleFormControlInput1"
              placeholder="Enter Your Email Address"
              required
            />
          </div>

          <div className="mb-3 w-50">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="uPass"
              value={logUser.uPass}
              className="form-control rounded-0 border-0 outline-0 py-2"
              id="exampleFormControlInput1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="w-50">
            <button
              type="submit"
              className="btn btn-light w-100 rounded-0 outline-0 border-0 text-white py-2 mt-2"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
