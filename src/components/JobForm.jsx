import { useMemo, useState } from "react";
import { todayISO } from "../utils/date.js";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];

export default function JobForm({
  initialValues,
  submitText = "Save",
  onSubmit,
  onCancel,
}) {
  const initial = useMemo(() => {
    return {
      companyName: initialValues?.companyName ?? "",
      jobTitle: initialValues?.jobTitle ?? "",
      status: initialValues?.status ?? "Applied",
      appliedDate: initialValues?.appliedDate ?? todayISO(),
      notes: initialValues?.notes ?? "",
    };
  }, [initialValues]);

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  function setField(k, v) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  function validate() {
    const e = {};
    if (!values.companyName.trim()) e.companyName = "Company name is required.";
    if (!values.jobTitle.trim()) e.jobTitle = "Job title is required.";
    if (!values.appliedDate) e.appliedDate = "Applied date is required.";
    if (!STATUSES.includes(values.status)) e.status = "Status is invalid.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.({
      companyName: values.companyName.trim(),
      jobTitle: values.jobTitle.trim(),
      status: values.status,
      appliedDate: values.appliedDate,
      notes: values.notes,
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="text-zinc-300">Company</span>
          <input
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none ring-0 transition focus:border-white/20"
            value={values.companyName}
            onChange={(e) => setField("companyName", e.target.value)}
            placeholder="e.g. Acme Inc."
          />
          {errors.companyName ? (
            <span className="text-xs text-rose-300">{errors.companyName}</span>
          ) : null}
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-zinc-300">Job title</span>
          <input
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none transition focus:border-white/20"
            value={values.jobTitle}
            onChange={(e) => setField("jobTitle", e.target.value)}
            placeholder="e.g. Frontend Engineer"
          />
          {errors.jobTitle ? (
            <span className="text-xs text-rose-300">{errors.jobTitle}</span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="text-zinc-300">Status</span>
          <select
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none transition focus:border-white/20"
            value={values.status}
            onChange={(e) => setField("status", e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status ? <span className="text-xs text-rose-300">{errors.status}</span> : null}
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-zinc-300">Applied date</span>
          <input
            type="date"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none transition focus:border-white/20"
            value={values.appliedDate}
            onChange={(e) => setField("appliedDate", e.target.value)}
          />
          {errors.appliedDate ? (
            <span className="text-xs text-rose-300">{errors.appliedDate}</span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-300">Notes</span>
        <textarea
          className="min-h-28 rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none transition focus:border-white/20"
          value={values.notes}
          onChange={(e) => setField("notes", e.target.value)}
          placeholder="Interview dates, links, recruiter name, salary range, etc."
        />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <button
            type="button"
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}