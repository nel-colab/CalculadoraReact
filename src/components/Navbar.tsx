import { Navbar as BootstrapNavbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const isLoginPage = currentPath === "/login";
  const isRegisterPage = currentPath === "/register";
  const isContactamePage = currentPath === "/contactame";

  // Detectar si está logueado (token en localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      className="w-100 shadow"
      style={{ background: "linear-gradient(90deg, #95c6d4 0%, #a4d1dc 100%)" }}
    >
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/src/assets/imgs/favicon.png"
            alt="Calculadora Logo"
            className="d-inline-block align-top me-2"
            style={{ width: "50px", height: "50px" }}
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbarSupportedContent" />
        <BootstrapNavbar.Collapse id="navbarSupportedContent">

          <Nav className="me-auto mb-2 mb-lg-0">
            {isContactamePage && !isLoggedIn ? (
              // En Contactame y NO logueado, solo mostrar login y register
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : isLoginPage ? (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/contactame">Contactame</Nav.Link>
              </>
            ) : isRegisterPage ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/contactame">Contactame</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/historyPage">Tus Operaciones</Nav.Link>
                <Nav.Link as={Link} to="/contactame">Contactame</Nav.Link>
              </>
            )}
          </Nav>

          {!isLoginPage && !isRegisterPage && isLoggedIn && (
            <Nav className="ms-auto">
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          )}

        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
