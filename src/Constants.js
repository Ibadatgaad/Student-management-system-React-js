// ─────────────────────────────────────────────
//  constants.js  –  shared data & initial state
// ─────────────────────────────────────────────

export const EMPTY_FORM = {
  name:       "",
  rollNo:     "",
  department: "",
  semester:   "",
  gpa:        "",
};

export const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Mathematics",
  "Physics",
];

export const DEPT_COLORS = {
  "Computer Science":        "#6366f1",
  "Electrical Engineering":  "#f59e0b",
  "Mechanical Engineering":  "#10b981",
  "Business Administration": "#ec4899",
  "Mathematics":             "#3b82f6",
  "Physics":                 "#8b5cf6",
};

export const INITIAL_STUDENTS = [
  { id: 1, name: "Aisha Raza",  rollNo: "CS-2201", department: "Computer Science",        semester: "6", gpa: "3.8" },
  { id: 2, name: "Omar Malik",  rollNo: "EE-2105", department: "Electrical Engineering",  semester: "4", gpa: "3.2" },
  { id: 3, name: "Sara Khan",   rollNo: "BS-2301", department: "Business Administration", semester: "2", gpa: "2.9" },
];