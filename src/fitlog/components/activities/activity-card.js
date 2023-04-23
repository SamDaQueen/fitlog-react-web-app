import {
  faHeart as faHeartEmpty,
  faThumbsDown as faThumbsDownEmpty,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFire,
  faHeart as faHeartFilled,
  faThumbsDown as faThumbsDownFilled,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ActivityCard = ({ activity: { message, username, date, _id } }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [fired, setFired] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };
  const handleDislike = () => {
    setDisliked(!disliked);
  };
  const handleFire = () => {
    setFired(!fired);
  };

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

  const dateObj = new Date(date);

  const heartIcon = liked ? faHeartFilled : faHeartEmpty;
  const thumbsDownIcon = disliked ? faThumbsDownFilled : faThumbsDownEmpty;

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-9">
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
            <button className="btn btn-link" onClick={handleLike}>
              <FontAwesomeIcon
                icon={heartIcon}
                className="me-2"
                style={{ color: liked ? "red" : "black" }}
              />
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
