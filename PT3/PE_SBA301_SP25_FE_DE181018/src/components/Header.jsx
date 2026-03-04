import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("memberID");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        {/* Yêu cầu 1: Student Code - Name */}
        <Navbar.Brand as={Link} to="/">DE181018 - Phan Văn Luýt PE Spring 25</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Yêu cầu 1: Nav.Dropdown */}
            <NavDropdown title="Car Management" id="car-nav">
              <NavDropdown.Item as={Link} to="/">List all cars</NavDropdown.Item>
              {role === "1" && (
                <NavDropdown.Item as={Link} to="/admin/cars">Create a new car</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">Welcome: {user}</Navbar.Text>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="primary" size="sm" onClick={() => navigate("/login")}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;