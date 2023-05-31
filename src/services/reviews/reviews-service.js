import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEWS_API_URL = `${API_BASE}/reviews`;
const USERS_API_URL = `${API_BASE}/users`;

export const createReview = (review) => axios.post(REVIEWS_API_URL, review);

export const findReviewsByExerciseId = async (exerciseId) =>
  axios.get(`${REVIEWS_API_URL}/${exerciseId}`);

export const findReviewsByUsername = (username) =>
  axios.get(`${USERS_API_URL}/${username}/reviews`);

export const deleteReview = (reviewId) =>
  axios.delete(`${REVIEWS_API_URL}/${reviewId}`);
