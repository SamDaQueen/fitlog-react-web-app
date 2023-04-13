import React from "react";
import WorkoutList from "../workouts";

const MyPlanComponent = () => {
  return (
    <>
      <h2>My Plan</h2>
      <h5 className="mt-4">
        Find the workouts saved by you or your trainer here.
      </h5>
      <WorkoutList page={"my-plan"} />
    </>
  );
};
export default MyPlanComponent;
