import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./exercises-service.js";

export const findExercisesThunk = createAsyncThunk(
  "workouts/findWorkouts",
  async () => await service.findExercises()
);

export const findExercisesByQueryThunk = createAsyncThunk(
  "workouts/findWorkoutsByQuery",
  async (query) => await service.findExercisesByQuery(query)
);
