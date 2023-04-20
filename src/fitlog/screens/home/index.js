import React from "react";
import { useSelector } from "react-redux";
import ActivityList from "../../components/activities";
import HeroComponent from "./hero.js";

const HomeScreen = () => {
  const { currentUser } = useSelector((state) => state.users);

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
