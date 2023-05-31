import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const ACTIVITIES_API = `${API_BASE}/activities`;
const USERS_API = `${API_BASE}/users`;

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
