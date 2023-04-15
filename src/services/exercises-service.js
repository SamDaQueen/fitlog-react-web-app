import axios from "axios";

const EXERCISE_API = process.env.REACT_APP_EXERCISE_API;
const API_KEY = process.env.REACT_APP_API_KEY;

export const findExercises = async () => {
  try {
    const response = await axios.get(EXERCISE_API, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    return error;
  }
};

export const findExercisesByQuery = async (query) => {
  try {
    const request = `${EXERCISE_API}${query}`;
    console.log("request", request);
    const response = await axios.get(request, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    return error;
  }
};

export const findExercisesByTerm = async (term) => {
  try {
    const request = `${EXERCISE_API}?name=${term}`;
    console.log("request", request);
    const response = await axios.get(request, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    return error;
  }
};
