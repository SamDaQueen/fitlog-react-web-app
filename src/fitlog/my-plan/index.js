import React from "react";
import ExerciseList from "../exercises";

const MyPlanComponent = () => {
  return (
    <>
      <h2>My Plan</h2>
      <h5 className="mt-4">
        Find the workouts saved by you or your trainer here.
      </h5>
      <ExerciseList page={"my-plan"} />
    </>
  );
};
export default MyPlanComponent;
