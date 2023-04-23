import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createReviewThunk } from "../../../services/reviews/reviews-thunks";
import "./index.css";
import StarRating from "./star-rating";

const ReviewsComponent = ({ reviews }) => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.users);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newReview = {
      rating: rating,
      review: review,
      username: currentUser.username,
      exerciseId: id,
    };

    await dispatch(createReviewThunk(newReview));
    setReview("");
    setRating(0);
  };

  return (
    <>
      <hr />
      <h4 className="mt-2">Rate & Review!</h4>
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <StarRating rating={rating} setRating={setRating} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="review">Review:</label>
                <textarea
                  className="form-control"
                  id="review"
                  onChange={handleReviewChange}
                  value={review}
                ></textarea>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      )}
      {!currentUser && <div>Please log in to leave a rating and review</div>}

      <div className="row">
        <h5>Reviews from other users:</h5>
        <div className="list-group">
          {reviews && reviews.length === 0 && (
            <li className="list-group-item">No reviews found</li>
          )}
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review, index) => (
              <Link
                key={index}
                to={"/profile/" + review.username}
                className="list-group-item"
              >
                <div className="row">
                  <div className="col-sm-4 col-md-3 stars">
                    {[...Array(review.rating)].map((star, i) => {
                      return (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                        ></FontAwesomeIcon>
                      );
                    })}
                  </div>
                  <div className="col-sm-8 col-md-9">
                    {review.review} ({review.username})
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ReviewsComponent;
