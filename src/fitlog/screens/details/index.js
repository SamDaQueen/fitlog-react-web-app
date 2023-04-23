import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findExerciseById } from "../../../services/exercises/exercises-service";
import {
  addToPlan,
  deleteFromPlan,
  findPlanByUserAndExercise,
} from "../../../services/plan/plan-service";
import { findReviewsByExerciseIdThunk } from "../../../services/reviews/reviews-thunks";
import { profileThunk } from "../../../services/users/users-thunks";
import ReviewsComponent from "../../components/reviews";
import UsersList from "../../components/users-list";
import AddComponent from "./add";
import DeleteComponent from "./delete";
import "./index.css";

const DetailsScreen = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [inPlan, setInPlan] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);

  const [reviewsList, setReviewsList] = useState(reviews);

  const loadScreen = async () => {
    const exerciseDetails = await findExerciseById(id);
    setDetails(exerciseDetails);
  };

  const checkIfInPlan = async () => {
    const plan = await findPlanByUserAndExercise(currentUser._id, id);
    if (plan) {
      setInPlan(true);
    }
  };

  const loadReviews = async () => {
    await dispatch(findReviewsByExerciseIdThunk(id))
      .unwrap()
      .then((res) => {
        setReviewsList(res);
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileThunk());
    loadScreen();
    checkIfInPlan();
    loadReviews();
  }, [inPlan, dispatch]);

  const handleBack = () => navigate(-1);

  const handleAddToPlan = async () => {
    if (!inPlan) {
      setInPlan(true);
      await addToPlan(currentUser._id, details);
      alert("Exercise added to your plan!");
    }
  };

  const handleDeleteFromPlan = async () => {
    await deleteFromPlan(currentUser._id, id);
    setInPlan(false);
    alert("Exercise deleted from your plan!");
  };

  return (
    <>
      {!details && <li className="list-group-item">Loading...</li>}
      {id === "undefined" && <div>Exercise id does not exist!</div>}
      {id !== "undefined" && details && (
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-8">
              <div onClick={handleBack} className="btn btn-secondary mb-3">
                <FontAwesomeIcon icon={faArrowLeft} /> {"  "}
                Back
              </div>

              <div className="row">
                <div className="col-md-7">
                  <h3>{details.name}</h3>
                </div>

                {currentUser && !inPlan && (
                  <div className="col-md-5" onClick={handleAddToPlan}>
                    <AddComponent />
                  </div>
                )}
                {currentUser && inPlan && (
                  <div className="col-md-5" onClick={handleDeleteFromPlan}>
                    <DeleteComponent />
                  </div>
                )}
              </div>

              {!currentUser && (
                <div>
                  Please log in to add this exercise to your personal plan.
                </div>
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

              <ReviewsComponent reviews={reviewsList} />
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <UsersList id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DetailsScreen;
