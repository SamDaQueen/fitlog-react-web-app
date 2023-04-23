import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../../services/reviews/reviews-thunks";

const ReviewCard = ({ review }) => {
  const dateObj = new Date(review.date);
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("delete");
    dispatch(deleteReviewThunk(review._id));
  };
  return (
    <div className="row">
      <div className="col-sm-4 col-md-3 stars">
        {[...Array(review.rating)].map((star, i) => {
          return <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>;
        })}
      </div>
      <div className="col-sm-7 col-md-8">
        {review.review} ({review.username}){" "}
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
      <div className="col-1">
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: "#536471" }}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
export default ReviewCard;
