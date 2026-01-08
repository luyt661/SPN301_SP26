import { useState } from "react";
import orchids from "../data/orchids";
import Orchid from "./Orchid";
import OrchidModal from "./OrchidModal";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ListOfOrchid() {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedOrchid(null);
  };

  return (
    <>
      <Row>
        {orchids.map((o) => (
          <Col md={4} className="mb-4" key={o.id}>
            <Orchid
              id={o.id}
              orchidName={o.orchidName}
              description={o.description}
              image={o.image}
              onDetail={() => handleShow(o)}   
            />
          </Col>
        ))}
      </Row>

      <OrchidModal
        show={show}
        onClose={handleClose}   
        orchid={selectedOrchid}
      />
    </>
  );
}

export default ListOfOrchid;
