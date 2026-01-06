import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      className="border-bottom"
      style={{ borderColor: "#ccc" }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-dark fw-bold"
        >
          My Website
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          {/* Menu */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-dark">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-dark">
              Contact
            </Nav.Link>
          </Nav>

          {/* Button */}
          <Button variant="outline-secondary">
            Get Started
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
