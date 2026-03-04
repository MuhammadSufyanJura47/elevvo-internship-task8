import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatusPill from "./StatusPill.jsx";
import { formatISODate } from "../utils/date.js";

export default function JobCard({ app, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.2 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-glow backdrop-blur transition hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm text-zinc-400">{app.companyName}</div>
          <div className="truncate text-base font-semibold">{app.jobTitle}</div>
        </div>
        <StatusPill status={app.status} />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-zinc-400">
        <div>Applied: {formatISODate(app.appliedDate)}</div>
        <Link
          to={`/jobs/${app.id}`}
          className="rounded-lg px-2 py-1 text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          Details →
        </Link>
      </div>
    </motion.div>
  );
}