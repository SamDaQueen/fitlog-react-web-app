import React from "react";
import defaultImage from "../../../assets/placeholder.jpg";
import "./index.css";

const ExercisesCard = ({ exercise: { name, category, image } }) => {
  const image_url = image || defaultImage;

  return (
    <div className="card  mb-3">
      <div className="row exercise-card g-0">
        <div className="col-md-3 d-none  d-md-flex">
          <img src={image_url} className="rounded-start" alt={name} />
        </div>
        <div className="col-md-9">
          <div className="card-body ">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Category: {category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesCard;
