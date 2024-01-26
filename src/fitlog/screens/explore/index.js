import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  findExercisesByTermThunk,
  findExercisesThunk,
} from "../../../services/exercises/exercises-thunks";
import ExerciseList from "../../components/exercises";
import SearchBar from "./search-bar";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  const [search, setSearch] = useState(searchTerm);
  const page = parseInt(sessionStorage.getItem("page")) || 1;

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      const offset = (page - 1) * 10;
      dispatch(findExercisesThunk(offset));
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (!search || search === "") {
      navigate("/search");
      dispatch(findExercisesThunk(0));
      return;
    }
    navigate(`/search/${search}`);
    dispatch(findExercisesByTermThunk(search));
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h5 className="mt-4">
            Explore thousands of exercises and add the ones you like to your
            personal plan.
          </h5>
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
          <ExerciseList search={search} />
        </div>
      </div>
    </>
  );
};
export default ExploreScreen;
