import { createSlice } from "@reduxjs/toolkit";
import activities from "../fitlog/activities/activities.json";

const activitiesSlice = createSlice({
  name: "activities",
  initialState: activities,
});

export default activitiesSlice.reducer;
