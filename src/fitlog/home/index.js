import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../../services/users/users-thunks";
import ActivityList from "../activities";
import HeroComponent from "./hero.js";

const HomeScreen = () => {
  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileThunk())
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <>
      <h2>Home</h2>
      {currentUser && <h5>Welcome, {currentUser.firstName}!</h5>}
      <HeroComponent />
      <ActivityList />
    </>
  );
};
export default HomeScreen;
