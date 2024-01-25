import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./exercises-service.js";

export const findExercisesThunk = createAsyncThunk(
  "exercises/findExercises",
  async (offset) => await service.findExercises(offset)
);

export const findExercisesByTermThunk = createAsyncThunk(
  "exercises/findExercisesByTerm",
  async (term) => await service.findExercisesByTerm(term)
);
