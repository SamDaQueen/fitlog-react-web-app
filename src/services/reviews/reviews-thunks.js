import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
  "reviews/create",
  async (review) => {
    const response = await reviewService.createReview(review);
    return response.data;
  }
);

export const findReviewsByExerciseIdThunk = createAsyncThunk(
  "reviews/findReviewsByExerciseId",
  async (exerciseId) => {
    const response = await reviewService.findReviewsByExerciseId(exerciseId);
    return response.data;
  }
);

export const deleteReviewThunk = createAsyncThunk(
  "reviews/delete",
  async (reviewId) => {
    await reviewService.deleteReview(reviewId);
    return reviewId;
  }
);
