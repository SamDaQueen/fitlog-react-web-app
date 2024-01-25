import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteActivityThunk,
  findAllActivitiesThunk,
} from "../../../services/activities/activities-thunk";

const ActivityCard = ({ activity: { message, username, date, _id }, page }) => {
  const { currentUser } = useSelector((state) => state.users);
  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteActivityThunk(_id));
    dispatch(findAllActivitiesThunk());
  };

  const dateObj = new Date(date);

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-11">
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
          {page !== "profile" &&
            (admin || (currentUser && username === currentUser.username)) && (
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
