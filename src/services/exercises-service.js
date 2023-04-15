import axios from "axios";

const EXERCISE_API = process.env.REACT_APP_EXERCISE_API;
const IMAGE_API = "https://wger.de/";

export const findExercises = async () => {
  const response = await axios.get(EXERCISE_API);
  return response.data;
};

export const findExercisesByTerm = async (term) => {
  const request = `${EXERCISE_API}search/?term=${term}`;
  const response = await axios.get(request);

  return response.data.suggestions.map((suggestion) => {
    let imageUrl = suggestion.data.image;
    if (imageUrl && !imageUrl.startsWith(IMAGE_API)) {
      imageUrl = IMAGE_API + imageUrl;
    }
    return {
      id: suggestion.data.id,
      name: suggestion.data.name,
      category: suggestion.data.category,
      image: imageUrl,
    };
  });
};
