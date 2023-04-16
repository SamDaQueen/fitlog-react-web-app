import { createSlice } from "@reduxjs/toolkit";
import {
  findExercisesByTermThunk,
  findExercisesThunk,
} from "../services/exercises/exercises-thunks";

const initialState = {
  exercises: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: {
    [findExercisesThunk.pending]: (state) => {
      state.loading = true;
      state.exercises = [];
    },
    [findExercisesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.exercises = payload.data;
      state.count = payload.count;
      state.next = payload.next;
      state.previous = payload.previous;
    },

    [findExercisesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findExercisesByTermThunk.pending]: (state) => {
      state.loading = true;
      state.exercises = [];
    },
    [findExercisesByTermThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.exercises = payload;
    },
    [findExercisesByTermThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default exercisesSlice.reducer;
