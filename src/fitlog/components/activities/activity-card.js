import { faThumbsDown as faThumbsDownEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  faFire,
  faThumbsDown as faThumbsDownFilled,
} from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivityThunk } from "../../../services/activities/activities-thunk";

const ActivityCard = ({ activity: { message, username, date, _id } }) => {
  const [disliked, setDisliked] = useState(false);
  const [fired, setFired] = useState(false);

  const { currentUser } = useSelector((state) => state.users);
  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  const dispatch = useDispatch();

  const handleDislike = () => {
    setDisliked(!disliked);
  };

  const handleFire = () => {
    setFired(!fired);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("delete");
    dispatch(deleteActivityThunk(_id));
  };

  const dateObj = new Date(date);

  const thumbsDownIcon = disliked ? faThumbsDownFilled : faThumbsDownEmpty;

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <h5 className="card-title">{message}</h5>
            <h6 className="card-subtitle mb-2 text-muted">@{username}</h6>
            <p className="card-text text-muted">
              {dateObj.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              , {dateObj.getFullYear()}
            </p>
          </div>
          <div className="col-3">
            <button className="btn btn-link" onClick={handleFire}>
              <FontAwesomeIcon
                icon={faFire}
                className="me-3"
                style={{ color: fired ? "orange" : "black" }}
              />
            </button>
            <button className="btn btn-link" onClick={handleDislike}>
              <FontAwesomeIcon
                icon={thumbsDownIcon}
                className="me-2"
                style={{ color: disliked ? "blue" : "black" }}
              />
            </button>
          </div>
          {(admin || (currentUser && username === currentUser.username)) && (
            <div className="col-1">
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#536471" }}
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
