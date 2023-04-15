import { faSplotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaDumbbell, FaRunning, FaWeight } from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";
import "./index.css";
import AddComponent from "./add";
import SetsReps from "./sets-reps";

const typeIcons = {
  cardio: <FaRunning />,
  olympic_weightlifting: <FaWeight />,
  plyometrics: <FaDumbbell />,
  powerlifting: <FaDumbbell />,
  strength: <GiMuscleUp />,
  stretching: <GiMuscleUp />,
  strongman: <GiMuscleUp />,
};

const muscleIcons = {
  abdominals: <GiMuscleUp />,
  abductors: <GiMuscleUp />,
  adductors: <GiMuscleUp />,
  biceps: <FaDumbbell />,
  calves: <GiMuscleUp />,
  chest: <FaDumbbell />,
  forearms: <FaDumbbell />,
  glutes: <GiMuscleUp />,
  hamstrings: <GiMuscleUp />,
  lats: <FaDumbbell />,
  lower_back: <GiMuscleUp />,
  middle_back: <GiMuscleUp />,
  neck: <GiMuscleUp />,
  quadriceps: <GiMuscleUp />,
  traps: <GiMuscleUp />,
  triceps: <FaDumbbell />,
};

const colorMap = {
  beginner: "success",
  intermediate: "warning",
  expert: "danger",
};

const WorkoutCard = ({
  workout: { name, instructions, difficulty, type, muscle, equipment },
  inPlan,
}) => {
  const color = colorMap[difficulty];
  const done = false;
  const image_url = "https://picsum.photos/200/200";

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card  mb-3">
      <div className="row workout-card g-0">
        <div className="col-md-3">
          <img src={image_url} className="rounded-start" alt={name} />
        </div>
        <div className="col-md-9">
          <div className="card-body ">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
