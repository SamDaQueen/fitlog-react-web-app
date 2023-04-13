import axios from "axios";

const EXERCISE_API = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = "6WUTGZhcuheC7UJUIjyYzA==hRS8n2wpZkkV0RH8";

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
    throw error;
  }
};

export const findExercisesWithPagination = async (offset) => {
  try {
    const request = `${EXERCISE_API}?offset=${offset}`;
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
