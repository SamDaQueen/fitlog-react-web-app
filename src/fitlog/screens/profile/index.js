import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findUserByUsername } from "../../../services/users/users-service";
import { logoutThunk } from "../../../services/users/users-thunks";
import "./index.css";

const ProfileScreen = () => {
  const { username } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const [profile, setProfile] = useState(currentUser);
  const [owner, setOwner] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const user = await findUserByUsername(username);
    if (user) {
      setProfile(user);
      setOwner(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserProfile();
      return;
    }
    setProfile(currentUser);
    setOwner(true);
  }, [currentUser, username]);

  let date = new Date();

  if (profile && profile.birthdate) {
    date = new Date(profile.birthdate);
  }

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <>
      {!currentUser && !profile && (
        <li className="list-group-item">
          Login invalid. Please go to Login/Register page
        </li>
      )}
      {currentUser && !profile && (
        <li className="list-group-item">This profile could not be found!</li>
      )}
      {profile && (
        <div className="card rounded-1">
          <div className="card-header">
            <h4 className="mb-0">
              {owner && `Your`} {!owner && `${profile.firstName}'s`} Profile
            </h4>
          </div>
          <div className="card-body row">
            <div className="col-9">
              <h4 className="mb-0">
                {profile.firstName && <span>{profile.firstName}</span>}{" "}
                {profile.lastName && <span>{profile.lastName}</span>}
              </h4>

              <span className="mb-2 text-muted">@{profile.username}</span>

              {owner && (
                <>
                  <p className="mb-1">{profile.email}</p>
                  <div className="text-muted">
                    <span className="fw-bold">Role: </span>
                    {profile.role}
                  </div>
                </>
              )}
              {profile.birthdate && (
                <div className="row mb-2">
                  <div>
                    <FontAwesomeIcon icon={faBirthdayCake} className="me-2" />
                    <span className="text-muted">
                      Born {monthNames[date.getMonth()]} {date.getDate()},{" "}
                      {date.getFullYear()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {owner && (
              <>
                <div className="col-3">
                  <Link to={"../edit-profile"}>
                    <h3 className="btn btn-primary float-end mb-5">
                      <FontAwesomeIcon className="me-2" icon={faPencil} />
                      Edit Profile
                    </h3>
                  </Link>

                  <h3
                    className="btn btn-danger float-end"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      className="me-2"
                      icon={faArrowRightFromBracket}
                    />
                    Logout
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileScreen;
