import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./index.css";
import StarRating from "./star-rating";

const ReviewsComponent = () => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      review: "This is a great exercise!",
    },
    {
      rating: 4,
      review: "This is a good exercise!",
    },
    {
      rating: 3,
      review: "This is an ok exercise!",
    },
  ]);
  const [rating, setRating] = useState(0);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      rating: rating,
      review: review,
    };
    setReviews([...reviews, newReview]);
    setReview("");
  };

  return (
    <>
      <h4 className="mt-2">
        Read reviews and ratings from other users and leave one!
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <StarRating />
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      <div className="row">
        <h5>Reviews:</h5>
        {reviews &&
          reviews.map((review, index) => (
            <div key={index}>
              <span className="stars">
                {[...Array(review.rating)].map((star, i) => {
                  return (
                    <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>
                  );
                })}
              </span>
              <span>{review.review}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReviewsComponent;
