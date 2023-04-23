import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              className="d-none"
            />
            <FaStar
              className="star-icon mb-1"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        );
      })}
      <p>{rating} out of 5 stars</p>
    </div>
  );
};
export default StarRating;
