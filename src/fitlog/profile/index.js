import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutThunk, profileThunk } from "../../services/users/users-thunks";
import "./index.css";

const ProfileScreen = () => {
  const { currentUser } = useSelector((state) => state.users);

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

  let date = new Date();

  if (currentUser && currentUser.birthdate) {
    date = new Date(currentUser.birthdate);
  }

  useEffect(() => {
    try {
      dispatch(profileThunk());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  function handleLogout() {
    dispatch(logoutThunk());
    navigate("/login");
  }

  return (
    <>
      {!currentUser && (
        <li className="list-group-item">
          You have not logged in yet. Please go to Login/Register Page.
        </li>
      )}
      {currentUser && (
        <div className="card rounded-1">
          <div className="card-header">
            <h4 className="mb-0">Your Profile</h4>
          </div>
          <div className="card-body row">
            <div className="col-9">
              <h4 className="mb-0">
                {currentUser.firstName && <span>{currentUser.firstName}</span>}{" "}
                {currentUser.lastName && <span>{currentUser.lastName}</span>}
              </h4>

              <span className="mb-2 text-muted">@{currentUser.username}</span>
              <p className="mb-1">{currentUser.email}</p>
              {currentUser.birthdate && (
                <div className="row mb-2">
                  <div>
                    <FontAwesomeIcon icon={faBirthdayCake} className="me-2" />
                    <span className="text-muted">
                      Born {monthNames[date.getMonth()]} {date.getDate()}.
                      {date.getFullYear()}
                    </span>
                  </div>
                </div>
              )}
              <div className="text-muted">
                <span className="fw-bold">Role: </span>
                {currentUser.role}
              </div>
            </div>

            <div className="col-3">
              <Link to={"../edit-profile"}>
                <h3 className="btn btn-primary float-end mb-5">
                  <FontAwesomeIcon className="me-2" icon={faPencil} />
                  Edit Profile
                </h3>
              </Link>

              <h3 className="btn btn-danger float-end" onClick={handleLogout}>
                <FontAwesomeIcon
                  className="me-2"
                  icon={faArrowRightFromBracket}
                />
                Logout
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileScreen;
