import React from "react";
import { useSelector } from "react-redux";
import heroImage from "../../../assets/fitness.jpg";

const HeroComponent = () => {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            {!currentUser && <h1>Get Fit and Stay Healthy</h1>}
            {currentUser && <h1>Welcome {currentUser.firstName}!</h1>}
            <h5>
              Plan your workouts and achieve your fitness goals with FitLog
            </h5>
          </div>
          <div className="col-md-6">
            <img src={heroImage} alt="FitLog Hero" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroComponent;
