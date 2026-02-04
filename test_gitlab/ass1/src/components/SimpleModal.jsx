export default function SimpleModal({ title, show, onClose, onSave, children }) {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
