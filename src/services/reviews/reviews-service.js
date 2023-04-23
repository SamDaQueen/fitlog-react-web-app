import axios from "axios";

const REVIEWS_API_URL = "http://localhost:4000/api/exercises/reviews";
const USERS_API_URL = "http://localhost:4000/api/users";

export const createReview = (review) => axios.post(REVIEWS_API_URL, review);

export const findReviewsByExerciseId = async (exerciseId) =>
  axios.get(`${REVIEWS_API_URL}/${exerciseId}`);

export const findReviewsByUsername = (username) =>
  axios.get(`${USERS_API_URL}/${username}/reviews`);

export const deleteReview = (reviewId) =>
  axios.delete(`${REVIEWS_API_URL}/${reviewId}`);
