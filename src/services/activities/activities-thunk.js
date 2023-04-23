import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./activities-service";

export const createActivityThunk = createAsyncThunk(
  "activities/createActivity",
  async (activity) => {
    return await service.createActivity(activity);
  }
);

export const findAllActivitiesThunk = createAsyncThunk(
  "activities/findAllActivities",
  async () => {
    return await service.findAllActivities();
  }
);

export const findActivitiesByUsernameThunk = createAsyncThunk(
  "activities/findActivitiesByUsername",
  async (username) => {
    return await service.findActivitiesByUsername(username);
  }
);

export const deleteActivityThunk = createAsyncThunk(
  "activities/deleteActivity",
  async (activityId) => {
    return await service.deleteActivity(activityId);
  }
);
