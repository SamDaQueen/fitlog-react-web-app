import React from "react";
import WorkoutList from "../workouts";
import DropdownComponent from "./dropdown-component";

const ExploreComponent = () => {
  return (
    <>
      <h2>Explore</h2>
      <h5 className="mt-4">
        Explore thousands of workouts and add the ones you like to your personal
        plan.
      </h5>
      <DropdownComponent />
      <WorkoutList page="explore" />
    </>
  );
};
export default ExploreComponent;
