import React from "react";
import { Modal } from "react-bootstrap";

function ConfirmModal({
  show,
  onClose,
  image,
  name,
  description,
  title = "Detail",
}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      dialogClassName="orchid-detail-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="orchid-detail-body">
        {image && (
          <img
            src={image}
            alt="detail"
            className="img-fluid rounded mb-3"
          />
        )}
        {name && <p className="fw-bold">{name}</p>}
        <div>{description}</div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
