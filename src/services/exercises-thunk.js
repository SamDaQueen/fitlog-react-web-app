import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./exercises-service.js";

export const findExercisesThunk = createAsyncThunk(
  "workouts/findWorkouts",
  async () => await service.findExercises()
);

export const findExercisesByTermThunk = createAsyncThunk(
  "workouts/findWorkoutsByTerm",
  async (term) => await service.findExercisesByTerm(term)
);
