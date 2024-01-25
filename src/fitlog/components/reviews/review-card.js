import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteReviewThunk,
  findReviewsByExerciseIdThunk,
} from "../../../services/reviews/reviews-thunks";

const ReviewCard = ({ review, page }) => {
  const { id } = useParams();
  const dateObj = new Date(review.date);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.users);
  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteReviewThunk(review._id));
    dispatch(findReviewsByExerciseIdThunk(id));
  };

  return (
    <div className="row">
      {page === "profile" && <div>{review.exerciseId.name}</div>}
      <div className="col-sm-4 col-md-3 stars">
        {[...Array(review.rating)].map((star, i) => {
          return <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>;
        })}
      </div>
      <div className="col-sm-7 col-md-8">
        {review.review} {page !== "profile" && `(${review.username})`}{" "}
        <span className="d-none d-md-inline text-muted">
          {dateObj.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      {page !== "profile" &&
        (admin ||
          (currentUser && review.username === currentUser.username)) && (
          <div className="col-1">
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: "#536471" }}
              onClick={handleDelete}
            />
          </div>
        )}
    </div>
  );
};
export default ReviewCard;
