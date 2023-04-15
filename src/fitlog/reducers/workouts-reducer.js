import { createSlice } from "@reduxjs/toolkit";
import {
  findExercisesByQueryThunk,
  findExercisesByTermThunk,
  findExercisesThunk,
} from "../../services/exercises-thunk";

const initialState = {
  workouts: [],
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: {
    [findExercisesThunk.pending]: (state) => {
      state.loading = true;
      state.workouts = [];
    },
    [findExercisesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.workouts = payload;
    },

    [findExercisesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findExercisesByQueryThunk.pending]: (state) => {
      state.loading = true;
      state.workouts = [];
    },
    [findExercisesByQueryThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.workouts = payload;
    },
    [findExercisesByQueryThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findExercisesByTermThunk.pending]: (state) => {
      state.loading = true;
      state.workouts = [];
    },
    [findExercisesByTermThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.workouts = payload;
    },
    [findExercisesByTermThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default workoutsSlice.reducer;
