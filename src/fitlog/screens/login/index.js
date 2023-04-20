import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../../services/users/users-thunks";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    dispatch(loginThunk({ username, password }))
      .unwrap()
      .then(() => navigate("/profile"))
      .catch((error) => {
        if (error.message === "Request failed with status code 404") {
          alert("Invalid username or password");
        } else {
          alert("Error logging you in");
        }
      });
  }

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
                    <h4 className="mb-0">Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label htmlFor="username" className="fw-bold">
                          Username
                        </label>
                        <input
                          type="username"
                          className="form-control"
                          id="username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                          placeholder="Password"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mt-3">
                        Login
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
export default LoginScreen;
