import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFire,
  faDumbbell,
  faHeartbeat,
  faThumbsUp,
  faBurn,
} from "@fortawesome/free-solid-svg-icons";

const WorkoutCard = ({
  imageSrc,
  heading,
  description,
  type,
  duration,
  intensity,
  sets,
  reps,
  caloriesBurnt,
}) => {
  return (
    <div className="my-3 p-3 bg-white rounded shadow-sm">
      <Row>
        <Col xs={12} md={4}>
          <Image src={imageSrc} fluid />
        </Col>
        <Col xs={12} md={8}>
          <h3>{heading}</h3>
          <p>{description.slice(0, 80)}...</p>
          <Row>
            <Col xs={6} md={4} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faClock} className="me-2" />
              <span>{duration} min</span>
            </Col>
            <Col xs={6} md={4} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faFire} className="me-2" />
              <span>{caloriesBurnt} cal</span>
            </Col>
            <Col xs={6} md={4} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faDumbbell} className="me-2" />
              <span>{sets} sets</span>
            </Col>
            <Col xs={6} md={4} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faHeartbeat} className="me-2" />
              <span>{reps} reps</span>
            </Col>
            <Col xs={6} md={4} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
              <span>{intensity}</span>
            </Col>
            <Col xs={6} md={4} className="d-flex align-items-center">
              <FontAwesomeIcon icon={faBurn} className="me-2" />
              <span>{type}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WorkoutCard;
