// ─────────────────────────────────────────────
//  StudentForm.jsx  –  Add & Update student
//  Props:
//    form        {object}   current form values (controlled)
//    errors      {object}   validation error messages
//    editingId   {number|null}
//    onChange    {fn}       field change handler
//    onSubmit    {fn}       add or save button handler
//    onCancel    {fn}       cancel edit mode
// ─────────────────────────────────────────────

import { DEPARTMENTS } from "../Constants.js";

/* ── Reusable Field wrapper ── */
function Field({ label, name, type = "text", placeholder, error, value, onChange, children }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>

      {/* If a custom input is passed (e.g. <select>), render it; else render default <input> */}
      {children ?? (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`field__input${error ? " field__input--error" : ""}`}
        />
      )}

      {/* Validation error message */}
      {error && <span className="field__error">⚠ {error}</span>}
    </div>
  );
}

/* ── StudentForm ── */
export default function StudentForm({ form, errors, editingId, onChange, onSubmit, onCancel }) {
  return (
    <div className={`card form-card${editingId ? " form-card--editing" : ""}`}>

      {/* Card header */}
      <div className="form-card__header">
        <h2 className="form-card__title">
          {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
        </h2>
        {editingId && <span className="editing-badge">Editing mode</span>}
      </div>

      {/* Input grid — controlled components */}
      <div className="form-grid">

        {/* Full Name — controlled text input */}
        <Field
          label="Full Name"
          name="name"
          placeholder="e.g. Aisha Raza"
          error={errors.name}
          value={form.name}
          onChange={onChange}
        />

        {/* Roll Number — controlled text input */}
        <Field
          label="Roll Number"
          name="rollNo"
          placeholder="e.g. CS-2201"
          error={errors.rollNo}
          value={form.rollNo}
          onChange={onChange}
        />

        {/* Department — controlled select */}
        <Field
          label="Department"
          name="department"
          error={errors.department}
          value={form.department}
          onChange={onChange}
        >
          <select
            id="department"
            name="department"
            value={form.department}
            onChange={onChange}
            className={`field__select${errors.department ? " field__select--error" : ""}`}
          >
            <option value="">Select department</option>
            {/* Unique key on each option */}
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && (
            <span className="field__error">⚠ {errors.department}</span>
          )}
        </Field>

        {/* Semester — controlled number input */}
        <Field
          label="Semester (1–8)"
          name="semester"
          type="number"
          placeholder="e.g. 4"
          error={errors.semester}
          value={form.semester}
          onChange={onChange}
        />

        {/* GPA — controlled number input */}
        <Field
          label="GPA (0.0–4.0)"
          name="gpa"
          type="number"
          placeholder="e.g. 3.5"
          error={errors.gpa}
          value={form.gpa}
          onChange={onChange}
        />
      </div>

      {/* Action buttons */}
      <div className="form-actions">
        <button className="btn btn--primary" onClick={onSubmit}>
          {editingId ? "Save Changes" : "Add Student"}
        </button>

        {/* Cancel only visible when editing */}
        {editingId && (
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

    </div>
  );
}