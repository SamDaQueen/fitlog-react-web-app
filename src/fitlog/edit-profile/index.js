import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findUserByUsername } from "../../services/users/users-service";
import {
  profileThunk,
  updateUserThunk,
} from "../../services/users/users-thunks";

const EditProfile = () => {
  const { username } = useParams();
  const { currentUser } = useSelector((state) => state.users);

  const [profile, setProfile] = useState(currentUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setValues = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setPassword(profile.password);
    setEmail(profile.email);
    setBirthdate(new Date(profile.birthdate));
  };
  const fetchUserProfile = async () => {
    if (username) {
      const user = await findUserByUsername(username);
      if (user) {
        setProfile(user);
        setValues();
      }
    } else {
      setProfile(currentUser);
      setValues();
    }
  };

  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  useEffect(() => {
    fetchUserProfile();
  }, [dispatch, currentUser, username]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUserThunk({
        ...profile,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
      })
    );
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      dispatch(profileThunk());
      navigate("/profile");
    }
  };

  return (
    <>
      {!admin && username && <div>Only admins can edit this profile!</div>}
      {((admin && username) || (currentUser && !username)) && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Edit Profile</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdate}>
                    <div className="form-group mb-2">
                      <label htmlFor="password" className="fw-bold">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="email" className="fw-bold">
                        New Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter new email"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="firstName" className="fw-bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="lastName" className="fw-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        required
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
                      Update Profile
                    </button>
                    <Link to={"/profile"}>
                      <button
                        type="button"
                        className="btn btn-secondary mt-3 ms-3"
                      >
                        Cancel
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
