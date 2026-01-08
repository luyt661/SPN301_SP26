import { useState } from "react";
import orchids from "../data/orchids";
import OrchidModal from "./OrchidModal";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ListOfOrchid() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrchid(null);
  };

  return (
    <>
      <Row>
        {orchids.map((o) => (
          <Col md={4} className="mb-4" key={o.id}>
            <Card className="shadow-sm h-100 text-center">
              <Card.Img
                variant="top"
                src={o.image}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body className="d-flex flex-column">
                {/* TÊN HOA */}
                <Card.Title>{o.orchidName}</Card.Title>

                {/* DESCRIPTION */}
                <Card.Text className="text-muted small mb-3">
                  {o.description.length > 60
                    ? o.description.substring(0, 60) + "..."
                    : o.description}
                </Card.Text>

                {/* NÚT DETAIL */}
                <Button
                  variant="primary"
                  onClick={() => handleShow(o)}
                  className="mt-auto"
                >
                  Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL DETAIL */}
      <OrchidModal
        show={showModal}
        handleClose={handleClose}
        orchid={selectedOrchid}
      />
    </>
  );
}

export default ListOfOrchid;
