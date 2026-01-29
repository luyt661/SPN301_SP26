import React from 'react';
import { Link } from 'react-router-dom'; // Sử dụng react-router-dom để điều hướng không load lại trang
import { Navbar, Nav, Container } from 'react-bootstrap'; // Import các component từ React Bootstrap

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" variant="dark"> 
      <Container>
        {/* Brand sẽ dẫn về trang chủ */}
        <Navbar.Brand as={Link} to="/">Orchid Demo</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Sử dụng 'as={Link}' để kết hợp Nav.Link của Bootstrap với Link của Router */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Nếu bạn muốn thêm các mục khác như trong hình mẫu của cô */}
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;