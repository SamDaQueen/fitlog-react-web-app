import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createExercise,
  findExerciseById,
} from "../../../services/exercises/exercises-service";
import {
  addToPlan,
  deleteFromPlan,
  findPlanByUserAndExercise,
} from "../../../services/plan/plan-service";
import AddComponent from "./add";
import DeleteComponent from "./delete";
import "./index.css";

const DetailsScreen = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [inPlan, setInPlan] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.users);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResponse = async () => {
    const exerciseDetails = await findExerciseById(id);
    setDetails(exerciseDetails);
  };

  const checkIfInPlan = async () => {
    const plan = await findPlanByUserAndExercise(currentUser._id, id);
    if (plan) {
      setInPlan(true);
    }
  };

  useEffect(() => {
    getResponse();
    checkIfInPlan();
  }, []);

  const handleBack = () => navigate(-1);

  const handleAddToPlan = async () => {
    const image = details.images[0] ? details.images[0] : "";
    await createExercise({
      exerciseId: id,
      name: details.name,
      category: details.category,
      image: image,
    });
    await addToPlan(currentUser._id, id);
    setInPlan(true);
  };

  const handleDeleteFromPlan = async () => {
    await deleteFromPlan(currentUser._id, id);
    setInPlan(false);
  };

  return (
    <>
      {!details && <li className="list-group-item">Loading...</li>}
      {id === "undefined" && <div>Exercise id does not exist!</div>}
      {id !== "undefined" && details && (
        <div className="container">
          <div onClick={handleBack} className="btn btn-secondary mb-3">
            <FontAwesomeIcon icon={faArrowLeft} /> {"  "}
            Back
          </div>

          <div className="row">
            <div className="col-md-9">
              <h3>{details.name}</h3>
            </div>

            {currentUser && !inPlan && (
              <div className="col-md-3" onClick={handleAddToPlan}>
                <AddComponent />
              </div>
            )}
            {currentUser && inPlan && (
              <div className="col-md-3" onClick={handleDeleteFromPlan}>
                <DeleteComponent />
              </div>
            )}
          </div>

          {!currentUser && (
            <div>Please log in to add this exercise to your personal plan.</div>
          )}

          {details.images && details.images.length > 0 && (
            <img
              src={details.images[0]}
              alt={details.name}
              className="img-fluid my-3 details-image"
            />
          )}

          {details.description && details.description.length > 0 && (
            <h6 className="my-3">
              {details.description.replace(/(<([^>]+)>)/gi, " ")}
            </h6>
          )}

          {details.category && details.category.length > 0 && (
            <>
              <p className="my-3">
                <strong>Category:</strong> {details.category}
              </p>
            </>
          )}

          {details.muscles && details.muscles.length > 0 && (
            <>
              <h5 className="my-3">Muscles:</h5>
              <ul>
                {details.muscles.map((muscle, index) => (
                  <li key={index}>{muscle}</li>
                ))}
              </ul>
            </>
          )}

          {details.equipment && details.equipment.length > 0 && (
            <>
              <h5 className="my-3">Equipment:</h5>
              <ul>
                {details.equipment.map((equipment, index) => (
                  <li key={index}>{equipment}</li>
                ))}
              </ul>
            </>
          )}

          <p className="my-3">
            <strong>Language:</strong> {details.language}
          </p>
        </div>
      )}
    </>
  );
};
export default DetailsScreen;
