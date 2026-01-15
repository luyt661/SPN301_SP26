import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer({ avatar, name, email }) {
  return (
    <footer className="bg-dark text-light py-4 border-top mt-auto">
      <Container>
        <Row className="align-items-center gy-3">
          {/* Avatar - Căn giữa trên mobile, trái trên desktop */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <img
                src={avatar}
                alt={name}
                height="50"
                width="50"
                className="rounded-circle border border-2 border-secondary me-2"
              />
              <span className="fw-bold">{name}</span>
            </div>
          </Col>

          {/* Copyright - Căn giữa */}
          <Col xs={12} md={4} className="text-center order-3 order-md-2">
            <div className="text-secondary small">
              © 2024 Orchid Shop Lab.
            </div>
            <div className="small">All rights reserved</div>
          </Col>

          {/* Email - Căn giữa trên mobile, phải trên desktop */}
          <Col xs={12} md={4} className="text-center text-md-end order-2 order-md-3">
            <a href={`mailto:${email}`} className="text-decoration-none text-info small">
               {email}
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;