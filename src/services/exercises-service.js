import axios from "axios";

const EXERCISE_API = process.env.REACT_APP_EXERCISE_API;
const IMAGE_API = "https://wger.de/";

export const findExercises = async () => {
  const response = await axios.get(EXERCISE_API);
  return {
    count: response.data.count,
    next: response.data.next,
    previous: response.data.previous,
    data: response.data.results.map((result) => {
      let imageUrl =
        result.images.length && result.images[0].image
          ? result.images[0].image
          : null;
      if (imageUrl && !imageUrl.startsWith(IMAGE_API)) {
        imageUrl = IMAGE_API + imageUrl;
      }
      return {
        id: result.id,
        name: result.name,
        category: result.category.name,
        image: imageUrl,
      };
    }),
  };
};

export const findExerciseById = async (id) => {
  const response = await axios.get(`${EXERCISE_API}/${id}`);
  const result = response.data;
  return {
    id: result.id,
    name: result.name,
    description: result.description,
    category: result.category.name,
    muscles: result.muscles
      .filter((muscle) => muscle.name_en !== "")
      .map((muscle) => muscle.name_en),
    equipment: result.equipment
      .filter((equipment) => equipment.name !== "")
      .map((equipment) => equipment.name),
    images: result.images
      .filter((image) => image.image !== "")
      .map((image) => image.image),
    language: result.language.full_name,
  };
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
