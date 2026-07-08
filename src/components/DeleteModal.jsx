// ─────────────────────────────────────────────
//  DeleteModal.jsx  –  Confirm delete dialog
//  Props:
//    student   {object}  the student to delete
//    onConfirm {fn}      called with student.id when confirmed
//    onCancel  {fn}      close the modal without deleting
// ─────────────────────────────────────────────

export default function DeleteModal({ student, onConfirm, onCancel }) {
  // Guard — don't render if no student is staged for deletion
  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal__icon">🗑️</div>

        <div className="modal__title">Delete this record?</div>

        <p className="modal__body">
          <strong>{student.name}</strong> ({student.rollNo}) will be
          permanently removed from the system.
        </p>

        <div className="modal__actions">
          {/* Cancel — close modal, no change to data */}
          <button className="btn--cancel" onClick={onCancel}>
            Cancel
          </button>

          {/* Confirm — triggers the actual delete in App.jsx */}
          <button
            className="btn--delete-confirm"
            onClick={() => onConfirm(student.id)}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}