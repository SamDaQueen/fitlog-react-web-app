import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findExercisesByQueryThunk } from "../../services/exercises-thunk";
import { updateQueryString } from "../explore/dropdown-component";
import WorkoutCard from "./workout-card.js";

const WorkoutList = (props) => {
  const inPlan = props.page !== "explore";
  const page = parseInt(sessionStorage.getItem("page")) || 1;
  const { workouts, loading, error } = useSelector((state) => state.workouts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePage = (page) => {
    let query = sessionStorage.getItem("query") || "";
    const offset = (page - 1) * 10;
    query = updateQueryString(query, "offset", offset);
    sessionStorage.setItem("query", query);
    navigate(`/search?${query}`);
    const request = `?${query}`;
    dispatch(findExercisesByQueryThunk(request));
  };

  useEffect(() => {
    updatePage(page);
  }, [dispatch]);

  const handlePageChange = (page) => {
    sessionStorage.setItem("page", page);
    updatePage(page);
  };

  return (
    <div className="list-group">
      <Pagination className="justify-content-center">
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => {
            handlePageChange(page - 1);
          }}
        />
        <Pagination.Item active>{page}</Pagination.Item>
        {workouts.length > 0 &&
          Array.from(
            { length: Math.ceil(workouts[0].count / 10) - 1 },
            (_, i) => (
              <Pagination.Item
                key={i + 2}
                active={page === i + 2}
                onClick={() => {
                  handlePageChange(i + 2);
                }}
              >
                {i + 2}
              </Pagination.Item>
            )
          )}
        <Pagination.Next
          disabled={
            workouts.length === 0 || page === Math.ceil(workouts[0].count / 10)
          }
          onClick={() => {
            handlePageChange(page + 1);
          }}
        />
      </Pagination>
      {error && <li className="list-group-item">{error}</li>}
      {!loading && workouts.length === 0 && (
        <li className="list-group-item">No workouts found</li>
      )}
      {loading && <li className="list-group-item">Loading...</li>}
      {!loading &&
        workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} inPlan={inPlan} />
        ))}
    </div>
  );
};

export default WorkoutList;
