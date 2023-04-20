import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";

const AddComponent = () => {
  return (
    <>
      <Button variant="primary" size="sm">
        <FontAwesomeIcon icon={faPlus} /> Add this to my plan
      </Button>
    </>
  );
};
export default AddComponent;
