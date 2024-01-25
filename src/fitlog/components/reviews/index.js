import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createReviewThunk,
  findReviewsByExerciseIdThunk,
} from "../../../services/reviews/reviews-thunks";
import "./index.css";
import ReviewCard from "./review-card";
import StarRating from "./star-rating";

const ReviewsComponent = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const { reviews, loading } = useSelector((state) => state.reviews);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const loadReviews = () => {
    dispatch(findReviewsByExerciseIdThunk(id));
  };

  useEffect(() => {
    loadReviews();
  }, [dispatch]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      rating: rating,
      review: review,
      username: currentUser.username,
      exerciseId: id,
      date: new Date().getTime(),
    };

    dispatch(createReviewThunk(newReview));
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
          <button type="submit" className="btn btn-primary m3-2">
            Submit
          </button>
        </form>
      )}
      {!currentUser && <div>Please log in to leave a rating and review</div>}

      <div className="row">
        <h5>Reviews from other users:</h5>
        <div className="list-group">
          {loading && <li className="list-group-item">Loading...</li>}
          {!loading && reviews && reviews.length === 0 && (
            <li className="list-group-item">No reviews found</li>
          )}
          {!loading &&
            reviews &&
            reviews.length > 0 &&
            reviews.map((review, index) => (
              <Link
                key={index}
                to={"/profile/" + review.username}
                className="list-group-item"
              >
                <ReviewCard review={review} />{" "}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ReviewsComponent;
