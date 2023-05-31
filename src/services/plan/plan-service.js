import axios from "axios";
import { createExercise } from "../exercises/exercises-service";

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

export const addToPlan = async (userId, exerciseDetails) => {
  const image =
    exerciseDetails.image && exerciseDetails.images[0]
      ? exerciseDetails.images[0]
      : "";
  await createExercise({
    _id: exerciseDetails.id,
    name: exerciseDetails.name,
    category: exerciseDetails.category,
    image: image,
  });
  const check = await findPlanByUserAndExercise(userId, exerciseDetails.id);
  if (check) {
    return check;
  }
  const response = await axios.post(
    `${USERS_API}/${userId}/add/${exerciseDetails.id}`
  );
  return response.data;
};

export const findPlanByUserAndExercise = async (userId, exerciseId) => {
  const response = await axios.get(`${USERS_API}/${userId}/add/${exerciseId}`);
  return response.data;
};

export const findExercisesByUserId = async (userId) => {
  const plans = await axios.get(`${USERS_API}/${userId}/plan`);
  return plans.data;
};

export const deleteFromPlan = async (userId, exerciseId) => {
  const response = await axios.delete(
    `${USERS_API}/${userId}/add/${exerciseId}`
  );
  return response.data;
};
