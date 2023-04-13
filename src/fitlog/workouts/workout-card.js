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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Row>
          <Col xs={9}>
            <Card.Title onClick={toggleExpand}>{name}</Card.Title>
            <Card.Text
              className={isExpanded ? "" : "CardText"}
              onClick={toggleExpand}
            >
              {instructions}
            </Card.Text>
          </Col>
          <Col xs={3}>
            <div className="d-flex flex-column align-items-end">
              {type && (
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">{typeIcons[type]}</span>
                  <span>{type}</span>
                </div>
              )}
              {muscle && (
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">{muscleIcons[muscle]}</span>
                  <span>{muscle}</span>
                </div>
              )}
              {equipment && (
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">
                    <FaDumbbell />
                  </span>
                  <span>{equipment}</span>
                </div>
              )}
              {difficulty && (
                <div>
                  <FontAwesomeIcon
                    icon={faSplotch}
                    className={`text-${color}`}
                  />{" "}
                  <span className={`text-${color} ml-2`}>{difficulty}</span>
                </div>
              )}
            </div>
          </Col>
        </Row>
        {!inPlan && <AddComponent />}
        {inPlan && <SetsReps done={done} />}
      </Card.Body>
    </Card>
  );
};

export default WorkoutCard;
