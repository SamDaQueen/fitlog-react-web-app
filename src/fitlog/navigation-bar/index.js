import {
  faArrowRightToBracket,
  faDoorOpen,
  faDumbbell,
  faHouseFire,
  faRectangleList,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((p) => p !== "");
  const active = paths[paths.length - 1];

  const { currentUser } = useSelector((state) => state.users);

  return (
    <div className="list-group">
      <Link
        to={"/home"}
        className={`list-group-item ${
          active === "home" || active === "fitlog" || active === undefined
            ? "active"
            : ""
        }`}
      >
        <FontAwesomeIcon icon={faHouseFire} className="me-2" />
        <span className="d-none d-xl-inline">Home</span>
      </Link>

      <Link
        to={"/search"}
        className={`list-group-item ${active === "search" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faDumbbell} className="me-2" />
        <span className="d-none d-xl-inline">Explore</span>
      </Link>

      {currentUser && (
        <Link
          to={"/my-plan"}
          className={`list-group-item ${active === "my-plan" ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faRectangleList} className="me-2" />
          <span className="d-none d-xl-inline">My Plan</span>
        </Link>
      )}

      {currentUser && (
        <Link
          to={"/profile"}
          className={`list-group-item ${active === "profile" ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faUserNinja} className="me-2" />
          <span className="d-none d-xl-inline">Profile</span>
        </Link>
      )}

      {!currentUser && (
        <Link
          to={"/login"}
          className={`list-group-item ${active === "login" ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
          <span className="d-none d-xl-inline">Login</span>
        </Link>
      )}

      {!currentUser && (
        <Link
          to={"/register"}
          className={`list-group-item ${active === "register" ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faDoorOpen} className="me-2" />
          <span className="d-none d-xl-inline">Register</span>
        </Link>
      )}
    </div>
  );
};

export default NavigationBar;
