import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../../../services/users/users-thunks";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());

  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(
      registerThunk({
        username,
        password,
        email,
        firstName,
        lastName,
        birthdate,
      })
    )
      .unwrap()
      .then(() => navigate("/profile"))
      .catch((error) => {
        if (error.message === "Request failed with status code 409") {
          alert("Username taken! Please choose another.");
        } else {
          alert("Error registering user");
        }
      });
  };

  return (
    <>
      {currentUser && (
        <li className="list-group-item">
          You have already logged in. Please go to Profile Page.
        </li>
      )}
      {!currentUser && (
        <div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="mb-0">Register</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleRegister}>
                      <div className="form-group">
                        <label htmlFor="username" className="fw-bold">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          placeholder="Enter username"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="fw-bold">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="fw-bold">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="firstName" className="fw-bold">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName" className="fw-bold">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          placeholder="Enter last name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="birthdate" className="fw-bold">
                          Birthdate
                        </label>
                        <DatePicker
                          id="birthdate"
                          className="form-control"
                          selected={birthdate}
                          onChange={(date) => setBirthdate(date)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mt-3">
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterScreen;
