import { createSlice } from "@reduxjs/toolkit";
import {
  createReviewThunk,
  deleteReviewThunk,
  findReviewsByExerciseIdThunk,
  findReviewsByUsernameThunk,
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
      state.reviews = action.payload;
    },
    [createReviewThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findReviewsByExerciseIdThunk.pending]: (state) => {
      state.loading = true;
    },
    [findReviewsByExerciseIdThunk.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload, "action.payload");
      state.reviews = action.payload;
    },
    [findReviewsByExerciseIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findReviewsByUsernameThunk.pending]: (state) => {
      state.loading = true;
    },
    [findReviewsByUsernameThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    [findReviewsByUsernameThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteReviewThunk.pending]: (state) => {
      state.loading = true;
    },
    [deleteReviewThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    [deleteReviewThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export default reviewsSlice.reducer;
