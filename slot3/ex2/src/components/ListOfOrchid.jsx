import Orchid from "./Orchid";
import orchids from "../data/orchids";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ListOfOrchid() {
  return (
    <Container>
      <Row>
        {orchids.map((orchid) => (
          <Col md={4} className="mb-4" key={orchid.id}>
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListOfOrchid;
