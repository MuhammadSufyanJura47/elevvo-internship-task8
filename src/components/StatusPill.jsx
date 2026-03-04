const styles = {
  Applied: "bg-sky-500/15 text-sky-200 border-sky-400/20",
  Interviewing: "bg-amber-500/15 text-amber-200 border-amber-400/20",
  Offer: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
  Rejected: "bg-rose-500/15 text-rose-200 border-rose-400/20",
};

export default function StatusPill({ status }) {
  const cls = styles[status] || "bg-white/10 text-zinc-200 border-white/10";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${cls}`}>
      {status}
    </span>
  );
}