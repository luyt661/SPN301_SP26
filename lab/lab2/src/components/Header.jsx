import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CarouselBanner from "./CarouselBanner";

function Header({ searchText, onSearchChange, onLogout }) {
  return (
    <header>
      <CarouselBanner />

      <Navbar bg="white" expand="lg" className="border-bottom sticky-top shadow-sm py-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-success">
            🌸 ORCHID SHOP
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-semibold">About</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="fw-semibold">Contact</Nav.Link>
            </Nav>

            <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
              <Form className="d-flex w-100" style={{ maxWidth: "300px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search orchids..."
                  className="rounded-pill"
                  value={searchText}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </Form>

              {onLogout && (
                <Button
                  variant="outline-danger"
                  className="rounded-pill w-100 w-lg-auto px-4"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;