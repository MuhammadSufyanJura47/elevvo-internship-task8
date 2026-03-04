import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../state/JobContext.jsx";
import StatusPill from "../components/StatusPill.jsx";
import { formatISODate } from "../utils/date.js";
import JobForm from "../components/JobForm.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplication, deleteApplication } = useJobs();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const app = useMemo(() => applications.find((a) => a.id === id), [applications, id]);

  if (!app) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-glow backdrop-blur">
        <div className="text-lg font-semibold">Application not found</div>
        <div className="mt-2 text-sm text-zinc-400">It may have been deleted or not imported.</div>
        <div className="mt-4">
          <Link
            to="/"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  function onSubmit(values) {
    const updated = {
      ...app,
      ...values,
      updatedAt: new Date().toISOString(),
    };
    updateApplication(updated);
    setEditing(false);
  }

  function doDelete() {
    deleteApplication(app.id);
    navigate("/");
  }

  return (
    <div className="grid gap-5">
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-sm text-zinc-400">{app.companyName}</div>
            <h1 className="truncate text-xl font-semibold">{app.jobTitle}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusPill status={app.status} />
              <span className="text-sm text-zinc-400">Applied: {formatISODate(app.appliedDate)}</span>
              <span className="text-sm text-zinc-500">
                Updated: {new Date(app.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              onClick={() => setEditing((v) => !v)}
              type="button"
            >
              {editing ? "Close Edit" : "Edit"}
            </button>
            <button
              className="rounded-xl bg-rose-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
              onClick={() => setConfirmDelete(true)}
              type="button"
            >
              Delete
            </button>
            <Link
              to="/"
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              Back
            </Link>
          </div>
        </div>
      </section>

      {editing ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur">
          <JobForm
            initialValues={app}
            submitText="Save Changes"
            onSubmit={onSubmit}
            onCancel={() => setEditing(false)}
          />
        </section>
      ) : (
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            <Info label="Company" value={app.companyName} />
            <Info label="Job title" value={app.jobTitle} />
            <Info label="Status" value={app.status} />
            <Info label="Applied date" value={formatISODate(app.appliedDate)} />
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold text-zinc-200">Notes</div>
            <div className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
              {app.notes?.trim() ? app.notes : "—"}
            </div>
          </div>
        </section>
      )}

      <ConfirmModal
        open={confirmDelete}
        title="Delete this application?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={doDelete}
        onClose={() => setConfirmDelete(false)}
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-zinc-100">{value}</div>
    </div>
  );
}