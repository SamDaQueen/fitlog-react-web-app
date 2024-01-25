import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExercisesCard from "./exercises-card.js";
import PaginationComponent from "../../pagination/index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { findExercisesByTermThunk } from "../../../services/exercises/exercises-thunks";
import { useNavigate } from "react-router-dom";

const ExerciseList = () => {
  const { exercises, loading, error, next, previous, count } = useSelector((state) => state.exercises);

  console.log("exercises next and prev", next, previous);

  const page = parseInt(sessionStorage.getItem("page")) || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePage = (page) => {
    console.log("updatePage", page);
    let query = sessionStorage.getItem("query") || "";
    const offset = (page - 1) * 10;
    console.log("offset", offset);
    console.log("query", query);
    navigate(`/search/${page}`);
    dispatch(findExercisesByTermThunk(query));
  };

  useEffect(() => {
    updatePage(page);
  }, []);

  const handlePageChange = (page) => {
    console.log("handlePageChange", page);
    sessionStorage.setItem("page", page);
    // updatePage(page);
  };

  return (
    <div className="list-group">
      <PaginationComponent
        count={1000}
        page={page}
        handlePageChange={handlePageChange}
      />
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
