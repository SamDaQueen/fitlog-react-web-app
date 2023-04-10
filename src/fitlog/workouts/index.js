import React from "react";
import WorkoutCard from "./workout-card.js";

const WorkoutPage = () => {
  const workout = {
    imageSrc: "/workout.jpg",
    heading: "Full-Body HIIT Workout",
    description:
      "This workout will get your heart pumping and your muscles working. It's a great way to burn calories and build strength.",
    type: "HIIT",
    duration: 30,
    intensity: "High",
    sets: 3,
    reps: 12,
    caloriesBurnt: 300,
  };

  return (
    <div>
      <WorkoutCard {...workout} />
    </div>
  );
};

export default WorkoutPage;
