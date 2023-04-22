import React from "react";
import ActivityList from "../../components/activities";
import HeroComponent from "./hero.js";

const HomeScreen = () => {
  return (
    <>
      <HeroComponent />
      <ActivityList />
    </>
  );
};
export default HomeScreen;
