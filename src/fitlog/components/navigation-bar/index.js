import {
  faArrowRightToBracket,
  faDoorOpen,
  faDumbbell,
  faHouseFire,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutThunk } from "../../../services/users/users-thunks";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((p) => p !== "");
  const active = paths[paths.length - 1];

  const { currentUser } = useSelector((state) => state.users);

  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

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
        <FontAwesomeIcon icon={faHouseFire} className="me-2 ms-sm-0" />
        <span className="d-none d-lg-inline">Home</span>
      </Link>

      <Link
        to={"/search"}
        className={`list-group-item ${active === "search" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faDumbbell} className="me-2" />
        <span className="d-none d-lg-inline">Explore</span>
      </Link>

      {currentUser && (
        <>
          <Link
            to={"/profile"}
            className={`list-group-item ${
              active === "profile" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUserNinja} className="me-2" />
            <span className="d-none d-lg-inline">Profile</span>
          </Link>
          {admin && (
            <Link
              to={"/users"}
              className={`list-group-item ${active === "users" ? "active" : ""}
                    `}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              <span className="d-none d-lg-inline">Users</span>
            </Link>
          )}
          <Link
            to={"/login"}
            onClick={handleLogout}
            className="list-group-item"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
            <span className="d-none d-lg-inline">Logout</span>
          </Link>{" "}
        </>
      )}

      {!currentUser && (
        <>
          <Link
            to={"/login"}
            className={`list-group-item ${active === "login" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
            <span className="d-none d-lg-inline">Login</span>
          </Link>

          <Link
            to={"/register"}
            className={`list-group-item ${
              active === "register" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faDoorOpen} className="me-2" />
            <span className="d-none d-lg-inline">Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
