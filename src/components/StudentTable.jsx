// ─────────────────────────────────────────────
//  StudentTable.jsx  –  Display all records
//  Props:
//    students    {array}   full list (for count)
//    filtered    {array}   search-filtered list
//    search      {string}  current search value
//    editingId   {number|null}
//    onSearch    {fn}      search input handler
//    onEdit      {fn}      load a student into the form
//    onDelete    {fn}      open confirm-delete modal
// ─────────────────────────────────────────────

import { DEPT_COLORS } from "../Constants.js";

/* ── Department Badge ── */
function Badge({ dept }) {
  const color = DEPT_COLORS[dept] || "#64748b";
  return (
    <span
      className="dept-badge"
      style={{ background: color + "20", color, borderColor: color + "40" }}
    >
      {dept}
    </span>
  );
}

/* ── GPA colour dot ── */
function GpaDot({ gpa }) {
  const g     = parseFloat(gpa);
  const color = g >= 3.5 ? "#10b981" : g >= 2.5 ? "#f59e0b" : "#ef4444";
  return (
    <span className="gpa-dot" style={{ color }}>
      <span className="gpa-dot__circle" style={{ background: color }} />
      {gpa}
    </span>
  );
}

/* ── Avatar initial ── */
function Avatar({ name }) {
  const hue = (name.charCodeAt(0) * 47) % 360;
  return (
    <div
      className="avatar"
      style={{
        background: `hsl(${hue}, 60%, 92%)`,
        color:      `hsl(${hue}, 60%, 35%)`,
      }}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

/* ── StudentTable ── */
export default function StudentTable({ students, filtered, search, editingId, onSearch, onEdit, onDelete }) {
  return (
    <div className="card table-card">

      {/* Table header + search */}
      <div className="table-card__header">
        <h2 className="table-card__title">All Records</h2>
        <input
          className="search-input"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="🔍 Search by name, roll no, or department…"
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">📭</div>
          <div className="empty-state__title">No students found</div>
          <div className="empty-state__subtitle">
            {search ? "Try a different search term" : "Add a student using the form above"}
          </div>
        </div>
      ) : (
        <div className="records-table-wrapper">
          <table className="records-table">
            <thead>
              <tr>
                {/* Unique key on each header cell */}
                {["#", "Name", "Roll No.", "Department", "Semester", "GPA", "Actions"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Each row uses student.id as the unique key */}
              {filtered.map((student, index) => (
                <tr
                  key={student.id}
                  className={editingId === student.id ? "row--editing" : ""}
                >
                  <td className="td--index">{index + 1}</td>

                  <td className="td--name">
                    <div className="student-name-cell">
                      <Avatar name={student.name} />
                      {student.name}
                    </div>
                  </td>

                  <td className="td--rollno">{student.rollNo}</td>
                  <td><Badge dept={student.department} /></td>
                  <td className="td--semester">Sem {student.semester}</td>
                  <td><GpaDot gpa={student.gpa} /></td>

                  {/* Action buttons — pass full student to onEdit, only id to onDelete trigger */}
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onDelete(student)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Row count footer */}
      {filtered.length > 0 && (
        <div className="table-footer">
          Showing {filtered.length} of {students.length} records
        </div>
      )}

    </div>
  );
}