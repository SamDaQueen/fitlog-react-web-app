import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findExercisesByUserId } from "../../../services/plan/plan-service";
import { findReviewsByUsername } from "../../../services/reviews/reviews-service";
import { findTrainerByUserId } from "../../../services/trainers/trainer-service";
import { findUserByUsername } from "../../../services/users/users-service";
import { deleteUserThunk } from "../../../services/users/users-thunks";
import MyPlanComponent from "../../components/my-plan";
import ReviewsProfile from "../../components/reviews-profile";
import "./index.css";

const ProfileScreen = () => {
  const { username } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const [profile, setProfile] = useState(currentUser);
  const [owner, setOwner] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");

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
      setOwner(false);
    }
  };

  const findPlansForUser = async (id) => {
    const plans = await findExercisesByUserId(id);
    setExercises(plans);
  };

  const findReviewsForUser = async (id) => {
    const reviews = await findReviewsByUsername(id);
    setReviews(reviews.data);
  };

  const findTrainer = async () => {
    const trainer = await findTrainerByUserId(profile._id);
    console.log(trainer.trainerId);
    setSelectedTrainer(trainer.trainerId.username);
  };

  const loadProfile = async () => {
    if (username) {
      await fetchUserProfile();
    } else {
      setProfile(currentUser);
      setOwner(true);
    }
    await findPlansForUser(profile._id);
    await findReviewsForUser(profile.username);
    await findTrainer();
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
        </div>
        <div className="col-5 d-none d-lg-block">
          <ReviewsProfile reviews={reviews} />
        </div>
      </div>
    </>
  );
};
export default ProfileScreen;
