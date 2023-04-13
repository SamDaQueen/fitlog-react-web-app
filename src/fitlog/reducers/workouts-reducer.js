import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import {
  findExercisesByQueryThunk,
  findExercisesWithPaginationThunk,
  findExercisesThunk,
} from "../../services/exercises-thunk";

const initialState = {
  workouts: [],
  // page: 1,
  // loading: true,
  // error: null,
  // type: "",
  // muscle: "",
  // difficulty: "",
  // query: "",
  // searchValue: "",
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    // updatePage(state, action) {
    //   state.page = action.payload;
    // },
    // updateType(state, action) {
    //   state.type = action.payload;
    // },
    // updateMuscle(state, action) {
    //   state.muscle = action.payload;
    // },
    // updaDifficulty(state, action) {
    //   state.difficulty = action.payload;
    // },
    // updateQuery(state, action) {
    //   state.query = action.payload;
    // },
    // updateSearchValue(state, action) {
    //   state.searchValue = action.payload;
    // },
  },
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
    [findExercisesWithPaginationThunk.pending]: (state) => {
      state.loading = true;
      state.workouts = [];
    },
    [findExercisesWithPaginationThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.workouts = payload;
    },
    [findExercisesWithPaginationThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { updatePage } = workoutsSlice.actions;
export default workoutsSlice.reducer;
