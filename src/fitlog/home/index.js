import React from "react";
import WorkoutPage from "../workouts";
import HeroComponent from "./hero.js";

const HomeComponent = () => {
  return (
    <>
      <h2>Home</h2>
      <HeroComponent />
      <WorkoutPage />
    </>
  );
};
export default HomeComponent;
