import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToPlan,
  findPlan,
} from "../../services/add-to-plan/add-to-plan-service";
import { findExerciseById } from "../../services/exercises/exercises-service";
import { profileThunk } from "../../services/users/users-thunks";
import AddComponent from "../exercises/add";
import "./index.css";

const DetailsScreen = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(profileThunk())
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResponse = async () => {
    const exerciseDetails = await findExerciseById(id);
    setDetails(exerciseDetails);
  };

  useEffect(() => {
    getResponse();
  }, []);

  const handleBack = () => navigate(-1);

  const handleAddToPlan = async () => {
    if (!currentUser) {
      alert("You must be logged in to add to your plan.");
      return;
    }
    // return if plan already exists
    const plan = await findPlan(currentUser._id, id);
    if (plan) {
      alert("This exercise is already in your plan.");
      return;
    }
    const response = await addToPlan(currentUser._id, id);
  };

  return (
    <>
      {!details && <li className="list-group-item">Loading...</li>}
      <div className="container">
        <div onClick={handleBack} className="btn btn-secondary mb-3">
          <FontAwesomeIcon icon={faArrowLeft} /> {"  "}
          Back
        </div>

        <div className="row">
          <div className="col-md-9">
            <h3>{details.name}</h3>
          </div>
          <div className="col-md-3">
            <div onClick={handleAddToPlan}>
              <AddComponent />
            </div>
          </div>
        </div>

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
    </>
  );
};
export default DetailsScreen;
