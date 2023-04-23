import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findExercisesByUserId } from "../../../services/plan/plan-service";
import { findUserByUsername } from "../../../services/users/users-service";
import { deleteUserThunk } from "../../../services/users/users-thunks";
import MyPlanComponent from "../../components/my-plan";
import "./index.css";

const ProfileScreen = () => {
  const { username } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const [profile, setProfile] = useState(currentUser);
  const [owner, setOwner] = useState(false);
  const [exercises, setExercises] = useState([]);

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
      await findPlansForUser(user._id);
    }
  };

  const findPlansForUser = async (id) => {
    const plans = await findExercisesByUserId(id);
    setExercises(plans);
  };

  const loadProfile = async () => {
    if (username) {
      await fetchUserProfile();
    } else {
      setProfile(currentUser);
      setOwner(true);
      await findPlansForUser(currentUser._id);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [currentUser, username]);

  let date = new Date();

  if (profile && profile.birthdate) {
    date = new Date(profile.birthdate);
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      await dispatch(deleteUserThunk(currentUser._id));
      navigate("/home");
    }
  };

  return (
    <>
      <div className="list-group">
        {username && !profile && (
          <li className="list-group-item">This profile could not be found!</li>
        )}
        {!currentUser && !profile && !username && (
          <li className="list-group-item">
            Login invalid. Please go to Login/Register page
          </li>
        )}
        {currentUser && !profile && (
          <li className="list-group-item">This profile could not be found!</li>
        )}
      </div>
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
                    onClick={handleDelete}
                  >
                    <FontAwesomeIcon className="me-2" icon={faXmark} />
                    Delete Profile
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {profile && <MyPlanComponent owner={owner} exercises={exercises} />}
    </>
  );
};
export default ProfileScreen;
