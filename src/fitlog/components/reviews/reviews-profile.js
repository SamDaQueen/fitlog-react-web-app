import { Link } from "react-router-dom";
import ReviewCard from "./review-card";

const ReviewsProfile = ({ reviews }) => {
  return (
    <>
      <h2>Reviews</h2>
      <div className="list-group">
        {reviews.map((review) => (
          <div key={review._id}>
            <Link
              key={review._id}
              to={"/details/" + review.exerciseId._id}
              className="list-group-item"
            >
              <ReviewCard review={review} page="profile" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default ReviewsProfile;
