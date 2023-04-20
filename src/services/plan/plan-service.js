import axios from "axios";

const USERS_API = "http://localhost:4000/api/users";
const SAVED_EXERCISES_API = "http://localhost:4000/api/exercises";

export const addToPlan = async (userId, exerciseId) => {
  const response = await axios.post(`${USERS_API}/${userId}/add/${exerciseId}`);
  return response.data;
};

export const findPlanByUserAndExercise = async (userId, exerciseId) => {
  const response = await axios.get(`${USERS_API}/${userId}/add/${exerciseId}`);
  return response.data;
};

export const findExercisesByUserId = async (userId) => {
  const plans = await axios.get(`${USERS_API}/${userId}/plan`);
  const exercises = [];

  for (let plan of plans.data) {
    const exercise = await axios.get(
      `${SAVED_EXERCISES_API}/${plan.exerciseId}`
    );
    exercises.push(exercise.data);
  }

  return exercises;
};

export const deleteFromPlan = async (userId, exerciseId) => {
  const response = await axios.delete(
    `${USERS_API}/${userId}/add/${exerciseId}`
  );
  return response.data;
};
