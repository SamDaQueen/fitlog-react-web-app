import React from "react";
import { Link } from "react-router-dom";
import ExercisesCard from "../exercises/exercises-card";

const MyPlanComponent = ({ owner, exercises }) => {
  return (
    <div className="mt-3">
      <h4>
        {" "}
        {owner && `Your`} {!owner && `Their`} Plan
      </h4>
      {owner && (
        <h5 className="mt-4">
          Find the workouts saved by you or your trainer here.
        </h5>
      )}
      {exercises.length > 0 &&
        exercises.map((exercise) => (
          <Link
            key={exercise.exerciseId}
            className="no-decoration"
            to={`/exercise/${exercise.exerciseId}`}
          >
            <ExercisesCard exercise={exercise} />
          </Link>
        ))}
    </div>
  );
};
export default MyPlanComponent;
