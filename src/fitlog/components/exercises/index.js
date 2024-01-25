import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findExercisesThunk } from "../../../services/exercises/exercises-thunks";
import PaginationComponent from "../../pagination/index";
import ExercisesCard from "./exercises-card.js";

const ExerciseList = ({ search }) => {
  const { exercises, loading, error, count } = useSelector(
    (state) => state.exercises
  );

  const [page, setPage] = useState(
    parseInt(sessionStorage.getItem("page")) || 1
  );

  const dispatch = useDispatch();

  const itemsPerPage = 10;

  const updatePage = (page) => {
    const offset = (page - 1) * itemsPerPage;
    dispatch(findExercisesThunk(offset));
  };

  useEffect(() => {
    if (search) return;
    updatePage(page);
  }, [page]);

  const handlePageChange = (page) => {
    sessionStorage.setItem("page", page);
    setPage(page);
    updatePage(page);
  };

  return (
    <div className="list-group">
      {!search && (
        <PaginationComponent
          count={count}
          page={page}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
        />
      )}
      {error && <li className="list-group-item">An error occurred.</li>}
      {!loading && exercises.length === 0 && (
        <li className="list-group-item">No exercises found</li>
      )}
      {loading && <li className="list-group-item">Loading...</li>}
      {!loading &&
        exercises.length > 0 &&
        exercises.map((exercise) => (
          <Link
            key={exercise.id}
            className="no-decoration"
            to={`/details/${exercise.id}`}
          >
            <ExercisesCard exercise={exercise} />
          </Link>
        ))}
    </div>
  );
};

export default ExerciseList;
