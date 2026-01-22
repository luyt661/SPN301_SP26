import { Modal, Button } from "react-bootstrap";

function ConfirmModal({
  show,
  onClose,

  // ===== DETAIL MODE =====
  image,
  name,
  description,

  // ===== CONFIRM MODE =====
  mode = "detail",      // "detail" | "confirm"
  title = "Detail",
  message,
  onConfirm,
}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size={mode === "detail" ? "lg" : undefined}
      dialogClassName={mode === "detail" ? "orchid-detail-modal" : ""}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* ===== MODE DETAIL ===== */}
        {mode === "detail" && (
          <>
            {image && (
              <img
                src={image}
                alt="detail"
                className="img-fluid rounded mb-3"
              />
            )}
            {name && <p className="fw-bold">{name}</p>}
            <div>{description}</div>
          </>
        )}

        {/* ===== MODE CONFIRM ===== */}
        {mode === "confirm" && (
          <p>{message || "Bạn có chắc chắn không?"}</p>
        )}
      </Modal.Body>

      {/* FOOTER CHỈ HIỆN KHI CONFIRM */}
      {mode === "confirm" && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            OK
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ConfirmModal;
