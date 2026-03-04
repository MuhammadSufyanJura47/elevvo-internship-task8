import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm.jsx";
import { useJobs } from "../state/JobContext.jsx";

function uuid() {
  return crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AddJob() {
  const { addApplication } = useJobs();
  const navigate = useNavigate();

  function onSubmit(values) {
    const now = new Date().toISOString();
    const app = {
      id: uuid(),
      ...values,
      createdAt: now,
      updatedAt: now,
    };

    addApplication(app);
    navigate(`/jobs/${app.id}`);
  }

  return (
    <div className="grid gap-5">
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur">
        <h1 className="text-xl font-semibold">Add Job</h1>
        <p className="mt-1 text-sm text-zinc-400">Add a new job application entry.</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur">
        <JobForm submitText="Add Application" onSubmit={onSubmit} onCancel={() => navigate("/")} />
      </section>
    </div>
  );
}