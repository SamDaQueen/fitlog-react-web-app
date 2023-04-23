import axios from "axios";

const ACTIVITIES_API = "http://localhost:4000/api/activities";
const USERS_API = "http://localhost:4000/api/users";

export const createActivity = async (activity) => {
  const response = await axios.post(ACTIVITIES_API, activity);
  return response.data;
};

export const findAllActivities = async () => {
  const response = await axios.get(ACTIVITIES_API);
  return response.data;
};

export const findActivitiesByUsername = async (username) => {
  const response = await axios.get(`${USERS_API}/${username}/activities`);
  return response.data;
};

export const deleteActivity = async (activityId) => {
  const response = await axios.delete(`${ACTIVITIES_API}/${activityId}`);
  return response.data;
};
