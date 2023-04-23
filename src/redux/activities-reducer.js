import { createSlice } from "@reduxjs/toolkit";
import {
  createActivityThunk,
  deleteActivityThunk,
  findActivitiesByUsernameThunk,
  findAllActivitiesThunk,
} from "../services/activities/activities-thunk";

const initialState = {
  activities: [],
  loading: false,
  error: null,
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: {
    [findAllActivitiesThunk.fulfilled]: (state, action) => {
      state.activities = action.payload.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      state.loading = false;
    },

    [findAllActivitiesThunk.pending]: (state) => {
      state.loading = true;
    },
    [findAllActivitiesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [findActivitiesByUsernameThunk.fulfilled]: (state, action) => {
      state.activities = action.payload.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      state.loading = false;
    },
    [findActivitiesByUsernameThunk.pending]: (state) => {
      state.loading = true;
    },
    [findActivitiesByUsernameThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createActivityThunk.fulfilled]: (state, action) => {
      state.activities.unshift(action.payload);
      state.loading = false;
    },
    [createActivityThunk.pending]: (state) => {
      state.loading = true;
    },
    [createActivityThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteActivityThunk.fulfilled]: (state, action) => {
      state.activities = state.activities.filter(
        (activity) => activity._id !== action.payload._id
      );
      state.loading = false;
    },
    [deleteActivityThunk.pending]: (state) => {
      state.loading = true;
    },
    [deleteActivityThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default activitiesSlice.reducer;
