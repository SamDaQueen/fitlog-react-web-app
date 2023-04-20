import React from "react";
import heroImage from "../../../assets/fitness.jpg";

const HeroComponent = () => {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1>Get Fit and Stay Healthy</h1>
            <p>Plan your workouts and achieve your fitness goals with FitLog</p>
            <button className="btn btn-primary">Get Started</button>
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
