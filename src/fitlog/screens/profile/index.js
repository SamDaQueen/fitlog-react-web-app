import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findActivitiesByUsername } from "../../../services/activities/activities-service";
import { findExercisesByUserId } from "../../../services/plan/plan-service";
import { findReviewsByUsername } from "../../../services/reviews/reviews-service";
import {
  findAllUsersByTrainerId,
  findTrainerByUserId,
} from "../../../services/trainers/trainer-service";
import { findUserByUsername } from "../../../services/users/users-service";
import { deleteUserThunk } from "../../../services/users/users-thunks";
import ActivityCard from "../../components/activities/activity-card";
import MyPlanComponent from "../../components/my-plan";
import ReviewsProfile from "../../components/reviews/reviews-profile";
import "./index.css";

const ProfileScreen = () => {
  const { username } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const [profile, setProfile] = useState(currentUser);
  const [owner, setOwner] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [users, setUsers] = useState([]);

  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const user = await findUserByUsername(username);
    if (user) {
      setProfile(user);
      await findPlansForUser(user._id);
      await findReviewsForUser(user.username);
      await findActivitiesForUser(user.username);
      setOwner(false);
    }
  };

  const findPlansForUser = async (id) => {
    const plans = await findExercisesByUserId(id);
    setExercises(plans);
  };

  const findReviewsForUser = async (username) => {
    const reviews = await findReviewsByUsername(username);
    setReviews(reviews.data);
  };

  const findActivitiesForUser = async (username) => {
    const activities = await findActivitiesByUsername(username);
    setActivities(activities);
  };

  const findTrainer = async () => {
    const trainer = await findTrainerByUserId(profile._id);
    console.log(trainer.trainerId);
    setSelectedTrainer(trainer.trainerId.username);
  };

  const fetchUsers = async () => {
    const users = await findAllUsersByTrainerId(profile._id);
    setUsers(users);
  };

  const loadProfile = async () => {
    if (username) {
      await fetchUserProfile();
    } else {
      setProfile(currentUser);
      await findPlansForUser(currentUser._id);
      await findReviewsForUser(currentUser.username);
      await findActivitiesForUser(currentUser.username);
      setOwner(true);
    }

    if (currentUser && currentUser.role === "TRAINER") {
      await fetchUsers();
    }
    if (profile && profile.role === "USER") {
      await findTrainer();
    }
  };

  useEffect(() => {
    loadProfile();
  }, [currentUser, username]);

  let date = new Date();
  if (profile && profile.birthdate) {
    date = new Date(profile.birthdate);
  }

  let editPath = `/edit-profile`;
  if (profile && username) {
    editPath = `/edit-profile/${profile.username}`;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (confirmDelete) {
      await dispatch(deleteUserThunk(profile._id));
      navigate("/home");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-lg-7">
          <div className="list-group">
            {(username || currentUser) && !profile && (
              <li className="list-group-item">
                This profile could not be found!
              </li>
            )}
            {!currentUser && !profile && !username && (
              <li className="list-group-item">
                Login invalid. Please go to Login/Register page
              </li>
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
                <div className="col-8">
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
                      {profile.role === "USER" && (
                        <Link to={`/profile/${selectedTrainer}`}>
                          <div className="text-muted">
                            <span className="fw-bold">Trainer: </span>
                            {selectedTrainer || "None"}
                          </div>
                        </Link>
                      )}
                    </>
                  )}
                  {profile.birthdate && (
                    <div className="row mb-2">
                      <div>
                        <FontAwesomeIcon
                          icon={faBirthdayCake}
                          className="me-2"
                        />
                        <span className="text-muted">
                          {date.toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                          })}
                          , {date.getFullYear()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {(owner || admin) && (
                  <>
                    <div className="col-4">
                      <Link to={editPath}>
                        <button className="btn btn-primary float-end mb-5">
                          <FontAwesomeIcon className="me-2" icon={faPencil} />
                          Edit Profile
                        </button>
                      </Link>


                      <button
                        className="btn btn-dark float-end"
                        onClick={handleDelete}
                      >
                        <FontAwesomeIcon className="me-2" icon={faXmark} />
                        Delete Profile
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {profile && currentUser && currentUser.role === "TRAINER" && (
            <div className="card rounded-1 mt-3">
              <div className="card-header">
                <h5 className="mb-0">
                  Assigned Users (Contact admin to change assignment)
                </h5>
              </div>
              <div className="list-group">
                {users.map((user) => (
                  <Link to={`/profile/${user.username}`}>
                    <li className="list-group-item">
                      {user.firstName} {user.lastName}
                    </li>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {profile && <MyPlanComponent owner={owner} exercises={exercises} />}
        </div>
        <div className="col-5 d-none d-lg-block">
          <ReviewsProfile reviews={reviews} />
          <h2 className="mt-5">Recent Activities</h2>
          {activities &&
            activities.map((activity) => (
              <ActivityCard activity={activity} page={"profile"} />
            ))}
        </div>
      </div>
    </>
  );
};
export default ProfileScreen;
