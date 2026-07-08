// ─────────────────────────────────────────────
//  Toast.jsx  –  Temporary notification banner
//  Props:
//    toast  { msg: string, type: "success"|"danger" } | null
// ─────────────────────────────────────────────

export default function Toast({ toast }) {
  // Guard — render nothing when there is no active toast
  if (!toast) return null;

  return (
    <div className={`toast toast--${toast.type}`}>
      {toast.type === "danger" ? "🗑 " : "✓ "}
      {toast.msg}
    </div>
  );
}