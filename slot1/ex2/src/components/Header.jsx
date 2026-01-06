import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      className="border-bottom"
      style={{ borderColor: '#ccc' }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand href="#home" className="text-dark fw-bold">
          My Website
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu */}
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="text-dark">
              About
            </Nav.Link>
            <Nav.Link href="#contact" className="text-dark">
              Contact
            </Nav.Link>
          </Nav>

          {/* Button */}
          <Button variant="outline-secondary">Get Started</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
