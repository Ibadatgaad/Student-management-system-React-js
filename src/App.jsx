// ─────────────────────────────────────────────
//  App.jsx  –  Root component
//
//  Owns all state (students, form, errors, etc.)
//  and passes data + handlers down to children.
//
//  Component tree:
//    App
//    ├── Toast          (notification)
//    ├── DeleteModal    (confirm delete)
//    ├── StudentForm    (add / update)
//    ├── StudentTable   (read / trigger edit & delete)
//    └── StatsBar       (summary counts)
// ─────────────────────────────────────────────

import { useState } from "react";

import { EMPTY_FORM, INITIAL_STUDENTS } from "./Constants.js";
import StudentForm  from "./components/Stuedentforms.jsx";
import StudentTable from "./components/StudentTable.jsx";
import DeleteModal  from "./components/DeleteModal.jsx";
import Toast        from "./components/Toast.jsx";
import StatsBar     from "./components/StatsBar.jsx";

import "./Studentrecord.css";

export default function App() {

  // ── State ──────────────────────────────────
  // Array of student objects — single source of truth for all CRUD ops
  const [students,       setStudents]       = useState(INITIAL_STUDENTS);

  // Controlled form values
  const [form,           setForm]           = useState(EMPTY_FORM);

  // Validation error messages keyed by field name
  const [errors,         setErrors]         = useState({});

  // null = add mode  |  number = edit mode (stores the id being edited)
  const [editingId,      setEditingId]      = useState(null);

  // Search string for filtering the table
  const [search,         setSearch]         = useState("");

  // Toast: { msg, type } | null
  const [toast,          setToast]          = useState(null);

  // Student staged for deletion (shown in DeleteModal) | null
  const [confirmDelete,  setConfirmDelete]  = useState(null);


  // ── Helpers ────────────────────────────────

  /** Show a temporary toast notification */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  /** Validate all form fields — returns an errors object */
  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name       = "Name is required";
    if (!form.rollNo.trim()) e.rollNo     = "Roll No. is required";
    if (!form.department)    e.department = "Select a department";

    if (!form.semester || isNaN(form.semester) || +form.semester < 1 || +form.semester > 8)
      e.semester = "Semester must be 1–8";

    if (!form.gpa || isNaN(form.gpa) || +form.gpa < 0 || +form.gpa > 4)
      e.gpa = "GPA must be 0.0–4.0";

    return e;
  };


  // ── CRUD Handlers ──────────────────────────

  /**
   * handleChange — keeps form state in sync with every keystroke.
   * Passed to StudentForm; makes inputs "controlled components".
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update only the changed field, leave others intact
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /**
   * handleSubmit — ADD or UPDATE depending on editingId.
   * Called by the "Add Student" / "Save Changes" button in StudentForm.
   */
  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);   // show inline errors, stop here
      return;
    }

    if (editingId !== null) {
      // ── UPDATE: replace the matching object in the array ──
      setStudents((prev) =>
        prev.map((s) => (s.id === editingId ? { ...form, id: editingId } : s))
      );
      showToast("Record updated successfully");
      setEditingId(null);
    } else {
      // ── ADD: append a new object with a unique id ──
      setStudents((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Student added successfully");
    }

    // Reset form and errors after successful operation
    setForm(EMPTY_FORM);
    setErrors({});
  };

  /**
   * handleEdit — load an existing student into the form for editing.
   * Called when the "Edit" button is clicked in StudentTable.
   */
  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name:       student.name,
      rollNo:     student.rollNo,
      department: student.department,
      semester:   student.semester,
      gpa:        student.gpa,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * handleDelete — remove a student by id from the array.
   * Called when "Delete" is confirmed inside DeleteModal.
   */
  const handleDelete = (id) => {
    // Filter out the deleted student — creates a new array (immutable update)
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setConfirmDelete(null);

    // If the deleted student was being edited, reset the form
    if (editingId === id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }

    showToast("Record deleted", "danger");
  };

  /**
   * handleCancel — exit edit mode without saving.
   * Called by the "Cancel" button in StudentForm.
   */
  const handleCancel = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
  };


  // ── Derived Data ───────────────────────────

  /** Filtered list used by StudentTable */
  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q)       ||
      s.rollNo.toLowerCase().includes(q)     ||
      s.department.toLowerCase().includes(q)
    );
  });


  // ── Render ─────────────────────────────────
  return (
    <div className="page">

      {/* Toast notification (top-right, auto-dismisses) */}
      <Toast toast={toast} />

      {/* Confirm delete modal (rendered only when a student is staged) */}
      <DeleteModal
        student={confirmDelete}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="container">

        {/* Page heading */}
        <header className="page-header">
          <h1 className="page-title">Student Record Management</h1>
          <p className="page-subtitle">
            {students.length} student{students.length !== 1 ? "s" : ""} enrolled
          </p>
        </header>

        {/* ADD / EDIT form — controlled component with validation */}
        <StudentForm
          form={form}
          errors={errors}
          editingId={editingId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* READ table — displays all records with unique keys */}
        <StudentTable
          students={students}
          filtered={filtered}
          search={search}
          editingId={editingId}
          onSearch={setSearch}
          onEdit={handleEdit}
          onDelete={setConfirmDelete}   // stages student → opens modal
        />

        {/* Summary stats */}
        <StatsBar students={students} />

      </div>
    </div>
  );
}