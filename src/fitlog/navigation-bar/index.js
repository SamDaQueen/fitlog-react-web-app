import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseFire,
  faUserNinja,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((p) => p !== "");
  const active = paths[paths.length - 1];

  return (
    <div className="list-group">
      <Link
        to={"/fitlog/home"}
        className={`list-group-item ${
          active === "home" || active === "fitlog" ? "active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faHouseFire} className="me-2" />
        <span className="d-none d-xl-inline">Home</span>
      </Link>

      <Link
        to={"/fitlog/explore"}
        className={`list-group-item ${active === "explore" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faDumbbell} className="me-2" />
        <span className="d-none d-xl-inline">Explore</span>
      </Link>

      <Link
        to={"/fitlog/profile"}
        className={`list-group-item ${active === "profile" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faUserNinja} className="me-2" />
        <span className="d-none d-xl-inline">Profile</span>
      </Link>
    </div>
  );
};

export default NavigationBar;
