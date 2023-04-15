import React from "react";
import defaultImage from "../../assets/placeholder.jpg";
import "./index.css";

const WorkoutCard = ({ workout: { name, category, image } }) => {
  const image_url = image || defaultImage;

  return (
    <div className="card  mb-3">
      <div className="row workout-card g-0">
        <div className="col-md-3">
          <img src={image_url} className="rounded-start" alt={name} />
        </div>
        <div className="col-md-9">
          <div className="card-body ">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Category: {category}</p>
            <div className="btn btn-primary float-end">Add to plan +</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
