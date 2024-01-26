import React from "react";
import ActivityList from "../../components/activities";
import HeroComponent from "./hero.js";

const HomeScreen = () => {
  return (
    <>
      <HeroComponent />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <ActivityList />
        </div>
      </div>
    </>
  );
};
export default HomeScreen;
