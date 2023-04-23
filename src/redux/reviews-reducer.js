import { createSlice } from "@reduxjs/toolkit";
import {
  createReviewThunk,
  deleteReviewThunk,
  findReviewsByExerciseIdThunk,
} from "../services/reviews/reviews-thunks";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: {
    [createReviewThunk.pending]: (state) => {
      state.loading = true;
    },
    [createReviewThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews.unshift(action.payload);
    },
    [createReviewThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [findReviewsByExerciseIdThunk.pending]: (state) => {
      state.loading = true;
    },
    [findReviewsByExerciseIdThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    [findReviewsByExerciseIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteReviewThunk.pending]: (state) => {
      state.loading = true;
    },
    [deleteReviewThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload._id
      );
    },
    [deleteReviewThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export default reviewsSlice.reducer;
