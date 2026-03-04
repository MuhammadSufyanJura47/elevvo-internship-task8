import { useMemo, useState } from "react";
import { useJobs } from "../state/JobContext.jsx";
import JobCard from "../components/JobCard.jsx";

const STATUSES = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

export default function Dashboard() {
  const { applications } = useJobs();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      const matchesQuery =
        !q ||
        a.companyName.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q);

      const matchesStatus = status === "All" ? true : a.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [applications, query, status]);

  return (
    <div className="grid gap-5">
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Track applications locally in your browser (export/import anytime).
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none transition focus:border-white/20 sm:w-64"
              placeholder="Search company or title…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none transition focus:border-white/20"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total" value={applications.length} />
          <Stat label="Applied" value={applications.filter((a) => a.status === "Applied").length} />
          <Stat
            label="Interviewing"
            value={applications.filter((a) => a.status === "Interviewing").length}
          />
          <Stat label="Offers" value={applications.filter((a) => a.status === "Offer").length} />
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-glow backdrop-blur">
          <div className="text-lg font-semibold">No applications found</div>
          <div className="mt-2 text-sm text-zinc-400">
            Try clearing filters, or add your first job application.
          </div>
        </section>
      ) : (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app, idx) => (
            <JobCard key={app.id} app={app} index={idx} />
          ))}
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}