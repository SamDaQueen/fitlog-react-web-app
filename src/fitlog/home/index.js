import React from "react";
import ActivityList from "../activities";
import HeroComponent from "./hero.js";

const HomeComponent = () => {
  return (
    <>
      <h2>Home</h2>
      <HeroComponent />
      <ActivityList />
    </>
  );
};
export default HomeComponent;
