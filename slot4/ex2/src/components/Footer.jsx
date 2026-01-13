import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer({ avatar, name, email }) {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row className="align-items-center text-center text-md-start">

          {/* Avatar */}
          <Col md={4}>
            <img
              src={avatar}
              alt={name}
              height="50"
              style={{ borderRadius: "50%" }}
            />
          </Col>

          {/* Name */}
        <Col md={4} className="text-center">
            <div className="fw-semibold">
                {name}
            </div>
            <small className="text-muted">
                © 2024. All rights reserved
            </small>
        </Col>


          {/* Email */}
          <Col md={4} className="text-md-end">
            {email}
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#e5e7eb",
    color: "#000",
    padding: "16px 0",
    borderTop: "1px solid #ccc",
  },
};

export default Footer;
