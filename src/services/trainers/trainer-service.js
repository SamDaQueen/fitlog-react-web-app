import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const TRAINERS_API_URL = `${API_BASE}/trainers`;

export const findAllUsersByTrainerId = async (trainerId) => {
  const response = await axios.get(`${TRAINERS_API_URL}/${trainerId}`);
  return response.data;
};

export const findTrainerByUserId = async (userId) => {
  const response = await axios.get(`${TRAINERS_API_URL}/user/${userId}`);
  return response.data;
};

export const createTrainerUser = async (trainerUser) => {
  const response = await axios.post(`${TRAINERS_API_URL}`, trainerUser);
  return response.data;
};

export const deleteTrainerUser = async (id) => {
  const response = await axios.delete(`${TRAINERS_API_URL}/${id}`);
  return response.data;
};

export const deleteTrainerUserByUserId = async (userId) => {
  const response = await axios.delete(`${TRAINERS_API_URL}/user/${userId}`);
  return response.data;
};

export const deleteTrainerUserByTrainerId = async (trainerId) => {
  const response = await axios.delete(
    `${TRAINERS_API_URL}/trainer/${trainerId}`
  );
  return response.data;
};
