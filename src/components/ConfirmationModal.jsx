import React from "react";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <p>Are you sure you want to delete this fruit?</p>
          <button className="modal-button" onClick={onConfirm}>
            Delete
          </button>
          <button className="modal-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <button
        className="modal-close"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default ConfirmationModal;
