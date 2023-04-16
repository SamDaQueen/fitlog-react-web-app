import { faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutThunk } from "../../services/users/users-thunks";

const Header = () => {
  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutThunk());
    navigate("/login");
  }

  return (
    <div className="col-12 mb-2">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="home">
            <FontAwesomeIcon className="ms-2" icon={faRunning} /> FitLog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Account" id="basic-nav-dropdown">
                {currentUser && (
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                )}
                {!currentUser && (
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                )}
                {!currentUser && (
                  <NavDropdown.Item as={Link} to="/register">
                    Register
                  </NavDropdown.Item>
                )}
                {currentUser && <NavDropdown.Divider />}
                {currentUser && (
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
