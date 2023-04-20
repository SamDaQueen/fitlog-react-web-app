import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";

const AddComponent = () => {
  return (
    <>
      <Button variant="danger" size="sm">
        <FontAwesomeIcon icon={faXmark} /> Remove from your plan
      </Button>
    </>
  );
};
export default AddComponent;
