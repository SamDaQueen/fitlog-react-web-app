import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./exercises-service.js";

export const findExercisesThunk = createAsyncThunk(
  "exercises/findExercises",
  async () => await service.findExercises()
);

export const findExercisesByTermThunk = createAsyncThunk(
  "exercises/findExercisesByTerm",
  async (term) => await service.findExercisesByTerm(term)
);
