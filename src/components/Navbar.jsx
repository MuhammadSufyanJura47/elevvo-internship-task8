import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useJobs } from "../state/JobContext.jsx";
import { normalizeImportedApplications } from "../utils/validators.js";
import ConfirmModal from "./ConfirmModal.jsx";

function navClass({ isActive }) {
  return [
    "rounded-xl px-3 py-2 text-sm font-medium transition",
    isActive ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white",
  ].join(" ");
}

export default function Navbar() {
  const { applications, importReplace } = useJobs();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState(null);
  const [error, setError] = useState("");

  function exportJson() {
    const date = new Date().toISOString().slice(0, 10);
    const filename = `job-applications-${date}.json`;
    const blob = new Blob([JSON.stringify(applications, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  async function onPickImportFile(e) {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const normalized = normalizeImportedApplications(parsed);
      setPendingImport(normalized);
      setConfirmOpen(true);
    } catch (err) {
      setError(err?.message || "Import failed. Please check the JSON format.");
    } finally {
      e.target.value = "";
    }
  }

  function confirmImportReplace() {
    importReplace(pendingImport || []);
    setPendingImport(null);
    setConfirmOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 animate-floaty rounded-2xl bg-gradient-to-br from-indigo-400/80 to-fuchsia-400/80 shadow-glow" />
          <div>
            <div className="text-sm font-semibold leading-4">Job Tracker</div>
            <div className="text-xs text-zinc-400">Local-first application log</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/add" className={navClass}>
            Add Job
          </NavLink>

          <button
            className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
            onClick={() => fileRef.current?.click()}
            type="button"
          >
            Import
          </button>
          <input
            ref={fileRef}
            className="hidden"
            type="file"
            accept="application/json"
            onChange={onPickImportFile}
          />

          <button
            className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            onClick={exportJson}
            type="button"
          >
            Export
          </button>
        </nav>
      </div>

      {error ? (
        <div className="mx-auto max-w-6xl px-4 pb-3 text-sm text-rose-300">{error}</div>
      ) : null}

      <ConfirmModal
        open={confirmOpen}
        title="Replace existing data?"
        description="Import will overwrite your current list of job applications."
        confirmText="Replace & Import"
        cancelText="Cancel"
        onConfirm={confirmImportReplace}
        onClose={() => {
          setConfirmOpen(false);
          setPendingImport(null);
        }}
      />
    </header>
  );
}