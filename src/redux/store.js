import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./activities-reducer";
import exercisesReducer from "./exercises-reducer";
import usersReducer from "./users-reducer";

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    activities: activitiesReducer,
    users: usersReducer,
  },
});
export default store;
