import axios from "axios";

const USERS_API = "http://localhost:4000/api/users";

export const addToPlan = async (userId, exerciseId) => {
  const response = await axios.post(`${USERS_API}/${userId}/add/${exerciseId}`);
  return response.data;
};

export const findPlan = async (userId, exerciseId) => {
  const response = await axios.get(`${USERS_API}/${userId}/add/${exerciseId}`);
  return response.data;
};
