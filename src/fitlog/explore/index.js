import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  findExercisesByTermThunk,
  findExercisesThunk,
} from "../../services/exercises/exercises-thunks";
import ExerciseList from "../exercises";
import SearchBar from "./search-bar";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  const [search, setSearch] = useState(searchTerm || "");

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      dispatch(findExercisesThunk());
    }
  }, [dispatch, searchTerm]);

  const handleSearch = () => {
    sessionStorage.setItem("page", "1");
    if (!search || search === "") {
      navigate(`/search`);
      dispatch(findExercisesThunk());
      return;
    }
    navigate(`/search/${search}`);
    dispatch(findExercisesByTermThunk(search));
  };

  return (
    <>
      <h2>Explore</h2>
      <h5 className="mt-4">
        Explore thousands of exercises and add the ones you like to your
        personal plan.
      </h5>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <ExerciseList page="explore" />
    </>
  );
};
export default ExploreScreen;
