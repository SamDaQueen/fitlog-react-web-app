import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExercisesCard from "./exercises-card.js";

const ExerciseList = () => {
  const { exercises, loading, error } = useSelector((state) => state.exercises);
  //
  // const page = parseInt(sessionStorage.getItem("page")) || 1;
  //
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

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
            to={`/exercise/${exercise.id}`}
          >
            <ExercisesCard exercise={exercise} />
          </Link>
        ))}
    </div>
  );
};

export default ExerciseList;
