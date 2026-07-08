// ─────────────────────────────────────────────
//  StatsBar.jsx  –  Summary stats below the table
//  Props:
//    students  {array}  full student list
// ─────────────────────────────────────────────

export default function StatsBar({ students }) {
  // Don't render when list is empty
  if (students.length === 0) return null;

  const avgGpa = (
    students.reduce((acc, s) => acc + parseFloat(s.gpa), 0) / students.length
  ).toFixed(2);

  const uniqueDepts    = new Set(students.map((s) => s.department)).size;
  const highAchievers  = students.filter((s) => parseFloat(s.gpa) >= 3.5).length;

  // Each stat uses its label as a unique key when rendered
  const stats = [
    { label: "Total Students", value: students.length, icon: "👥", color: "#6366f1" },
    { label: "Avg GPA",        value: avgGpa,          icon: "📊", color: "#10b981" },
    { label: "Departments",    value: uniqueDepts,     icon: "🏛️", color: "#f59e0b" },
    { label: "High Achievers", value: highAchievers,   icon: "⭐", color: "#ec4899" },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-card__icon">{stat.icon}</div>
          <div className="stat-card__value" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="stat-card__label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}