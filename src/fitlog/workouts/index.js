import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkoutCard from "./workout-card.js";

const WorkoutList = (props) => {
  const inPlan = props.page !== "explore";
  const { workouts, loading, error } = useSelector((state) => state.workouts);

  const page = parseInt(sessionStorage.getItem("page")) || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const updatePage = (page) => {
  //   let query = sessionStorage.getItem("query") || "";
  //   const offset = (page - 1) * 10;
  //   // query = updateQueryString(query, "offset", offset);
  //   sessionStorage.setItem("query", query);
  //   navigate(`/search/${query}`);
  //   const request = `?${query}`;
  //   dispatch(findExercisesByQueryThunk(request));
  // };
  //
  // useEffect(() => {
  //   updatePage(page);
  // }, [dispatch]);
  //
  // const handlePageChange = (page) => {
  //   sessionStorage.setItem("page", page);
  //   updatePage(page);
  // };

  return (
    <div className="list-group">
      {/*<PaginationComponent*/}
      {/*  workouts={workouts}*/}
      {/*  page={page}*/}
      {/*  handlePageChange={handlePageChange}*/}
      {/*/>*/}
      {error && <li className="list-group-item">An error occurred.</li>}
      {!loading && workouts.length === 0 && (
        <li className="list-group-item">No workouts found</li>
      )}
      {loading && <li className="list-group-item">Loading...</li>}
      {!loading &&
        workouts.length > 0 &&
        workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} inPlan={inPlan} />
        ))}
    </div>
  );
};

export default WorkoutList;
