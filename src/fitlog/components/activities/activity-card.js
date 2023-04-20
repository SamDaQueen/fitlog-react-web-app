import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as faThumbsDownEmpty } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownFilled } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ActivityCard = ({
  activity: { message, initialLiked, initialDisliked, initialFired },
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [disliked, setDisliked] = useState(initialDisliked);
  const [fired, setFired] = useState(initialFired);
  const handleLike = () => {
    setLiked(!liked);
  };
  const handleDislike = () => {
    setDisliked(!disliked);
  };
  const handleFire = () => {
    setFired(!fired);
  };

  const heartIcon = liked ? faHeartFilled : faHeartEmpty;
  const thumbsDownIcon = disliked ? faThumbsDownFilled : faThumbsDownEmpty;

  return (
    <Card className="mb-2">
      <Card.Body>
        <Row>
          <Col xs={9}>
            <Card.Title>{message}</Card.Title>
          </Col>
          <Col xs={3}>
            <Button variant="link" onClick={handleLike}>
              <FontAwesomeIcon
                icon={heartIcon}
                className="me-2"
                style={{ color: liked ? "red" : "black" }}
              />
            </Button>
            <Button variant="link" onClick={handleFire}>
              <FontAwesomeIcon
                icon={faFire}
                className="me-3"
                style={{ color: fired ? "orange" : "black" }}
              />
              <Button variant="link" onClick={handleDislike}>
                <FontAwesomeIcon
                  icon={thumbsDownIcon}
                  className="me-2"
                  style={{ color: disliked ? "blue" : "black" }}
                />
              </Button>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ActivityCard;
