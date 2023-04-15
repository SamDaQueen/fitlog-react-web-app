import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";

const SetsReps = ({ done }) => {
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [isDone, setIsDone] = useState(done);

  const handleSetChange = (e) => {
    setSets(e.target.value);
  };

  const handleRepChange = (e) => {
    setReps(e.target.value);
  };

  const handleClick = () => {
    setIsDone(!isDone);
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <div className="me-4">
          <span className="me-2">Sets:</span>
          <input
            type="number"
            value={sets}
            onChange={(e) => handleSetChange(e)}
            min="1"
            max="99"
            className="form-control form-control-sm w-50 d-inline-block"
          />
        </div>
        <div>
          <span className="me-2">Reps:</span>
          <input
            type="number"
            value={reps}
            onChange={(e) => handleRepChange(e)}
            min="1"
            max="99"
            className="form-control form-control-sm w-50 d-inline-block"
          />
        </div>
        <div className="ms-4">
          <Button
            variant={isDone ? "success" : "outline-dark"}
            onClick={handleClick}
            className="ms-auto"
          >
            {isDone && <FontAwesomeIcon icon={faCheck} className="me-2" />}
            {isDone ? "Done" : "Done"}
            {!isDone && <FontAwesomeIcon icon={faQuestion} className="ms-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SetsReps;
