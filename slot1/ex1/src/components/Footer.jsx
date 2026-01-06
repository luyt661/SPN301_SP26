import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row className="align-items-center text-center text-md-start">
          
          {/* Cột trái: Avatar */}
          <Col md={4}>
            <img
              src="https://i.pravatar.cc/100"
              alt="Avatar"
              height="50"
              style={{ borderRadius: "50%" }}
            />
          </Col>

          {/* Cột giữa: Copyright */}
          <Col md={4} className="text-center">
            © 2024 All rights reserved
          </Col>

          {/* Cột phải: Email */}
          <Col md={4} className="text-md-end">
            luytphan@gmail.com
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
