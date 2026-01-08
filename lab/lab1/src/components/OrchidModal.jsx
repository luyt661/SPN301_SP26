import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function OrchidModal({ show, handleClose, orchid }) {
  if (!orchid) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{orchid.orchidName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <img
          src={orchid.image}
          alt={orchid.orchidName}
          className="img-fluid rounded mb-3"
        />

        <p><strong>Description:</strong> {orchid.description}</p>
        <p><strong>Category:</strong> {orchid.category}</p>
        <p>
          <strong>Special:</strong>{" "}
          {orchid.isSpecial ? (
            <Badge bg="success">True</Badge>
          ) : (
            <Badge bg="secondary">False</Badge>
          )}
        </p>
        <p className="text-danger fw-bold">
          Price: {orchid.price.toLocaleString()} VND
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrchidModal;
