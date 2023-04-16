import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findExerciseById } from "../../services/exercises/exercises-service";
import "./index.css";

const DetailsScreen = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResponse = async () => {
    const response = await findExerciseById(id);
    setDetails(response);
  };

  useEffect(() => {
    getResponse().then((r) => console.log(r));
  }, [getResponse]);

  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      {!details && <li className="list-group-item">Loading...</li>}
      <div className="container">
        <div onClick={handleBack} className="btn btn-secondary mb-3">
          <FontAwesomeIcon icon={faArrowLeft} /> {"  "}
          Back
        </div>
        <div className="row">
          <div className="col">
            <h3>{details.name}</h3>

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
        </div>
      </div>
    </>
  );
};
export default DetailsScreen;
