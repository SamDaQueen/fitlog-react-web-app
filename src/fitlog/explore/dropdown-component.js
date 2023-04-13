import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findExercisesByQueryThunk } from "../../services/exercises-thunk";

const TYPE_OPTIONS = {
  all: "All",
  olympic_weightlifting: "Olympic Weightlifting",
  plyometrics: "Plyometrics",
  powerlifting: "Powerlifting",
  strength: "Strength",
  stretching: "Stretching",
  strongman: "Strongman",
};

const MUSCLE_OPTIONS = {
  all: "All",
  abdominals: "Abdominals",
  abductors: "Abductors",
  adductors: "Adductors",
  biceps: "Biceps",
  calves: "Calves",
  chest: "Chest",
  forearms: "Forearms",
  glutes: "Glutes",
  hamstrings: "Hamstrings",
  lats: "Lats",
  lower_back: "Lower Back",
  middle_back: "Middle Back",
  neck: "Neck",
  quadriceps: "Quadriceps",
  traps: "Traps",
  triceps: "Triceps",
};

const DIFFICULTY_OPTIONS = {
  all: "All",
  beginner: "Beginner",
  intermediate: "Intermediate",
  expert: "Expert",
};

export function updateQueryString(query, id, value) {
  if (!query) {
    return `${id}=${value}`;
  }
  // remove the id from the query string if the value is empty
  if (!value) {
    return query
      .split("&")
      .filter((queryPair) => {
        const [k, v] = queryPair.split("=");
        return k !== id;
      })
      .join("&");
  }

  const queryPairs = query.split("&");
  let updated = false;

  // update the value if the id is already in the query string
  const updatedQueryPairs = queryPairs.map((queryPair) => {
    const [k, v] = queryPair.split("=");
    if (k === id) {
      updated = true;
      return `${k}=${value}`;
    }
    return queryPair;
  });

  if (!updated) {
    updatedQueryPairs.push(`${id}=${value}`);
  }

  return updatedQueryPairs.join("&");
}

const DropdownComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const type = sessionStorage.getItem("type") || "";
  const muscle = sessionStorage.getItem("muscle") || "";
  const difficulty = sessionStorage.getItem("difficulty") || "";
  const searchValue = sessionStorage.getItem("searchValue") || "";
  const query = sessionStorage.getItem("query") || "";

  const [search, setSearch] = useState(searchValue);

  useEffect(() => {
    const query = sessionStorage.getItem("query") || "";
    const request = `?${query}`;
    console.log("useEffect: ", request);
    dispatch(findExercisesByQueryThunk(request));
  }, [dispatch]);

  const handleFilter = (query, id, value) => {
    if (value === "all") {
      value = "";
    }
    let updatedQuery = updateQueryString(query, id, value);
    updatedQuery = updateQueryString(updatedQuery, "offset", "0");
    sessionStorage.setItem("query", updatedQuery);
    sessionStorage.setItem(id, value);
    sessionStorage.setItem("page", "1");
    const request = `?${updatedQuery}`;
    navigate(`/search?${updatedQuery}`);
    dispatch(findExercisesByQueryThunk(request));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const updatedQuery = updateQueryString(query, "name", search);
    sessionStorage.setItem("query", updatedQuery);
    sessionStorage.setItem("searchValue", search);
    sessionStorage.setItem("page", "1");
    console.log("handleSearch: ", updatedQuery);
    const request = `?${updatedQuery}`;
    navigate(`/search?${updatedQuery}`);
    dispatch(findExercisesByQueryThunk(request));
  };

  return (
    <>
      <Row className="mt-4 mb-2">
        <Col xs={12} lg={6} className="mb-2">
          <Form onSubmit={handleSearch}>
            <Row>
              <Col xs={10}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search for exercises"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Button variant="primary" type="submit" className="float-end">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={12} lg={6}>
          <label htmlFor="dropdown-type">Type:</label>
          <DropdownButton
            id="dropdown-type"
            title={TYPE_OPTIONS[type] || "All"}
            variant="primary"
            onSelect={(value) => handleFilter(query, "type", value)}
            className="float-end"
          >
            {Object.entries(TYPE_OPTIONS).map(([key, value]) => (
              <Dropdown.Item key={key} eventKey={key}>
                {value}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} lg={6} className="mb-2 float-end">
          <label htmlFor="dropdown-muscle">Muscle:</label>
          <DropdownButton
            id="dropdown-muscle"
            title={MUSCLE_OPTIONS[muscle] || "All"}
            variant="primary"
            onSelect={(value) => handleFilter(query, "muscle", value)}
            className="float-end"
          >
            {Object.entries(MUSCLE_OPTIONS).map(([key, value]) => (
              <Dropdown.Item key={key} eventKey={key}>
                {value}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col xs={12} lg={6}>
          <label htmlFor="dropdown-difficulty">Difficulty:</label>
          <DropdownButton
            id="dropdown-difficulty"
            title={DIFFICULTY_OPTIONS[difficulty] || "All"}
            variant="primary"
            onSelect={(value) => handleFilter(query, "difficulty", value)}
            className="float-end"
          >
            {Object.entries(DIFFICULTY_OPTIONS).map(([key, value]) => (
              <Dropdown.Item key={key} eventKey={key}>
                {value}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
    </>
  );
};

export default DropdownComponent;
