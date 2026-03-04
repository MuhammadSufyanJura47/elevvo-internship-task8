const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];

export function isValidStatus(s) {
  return STATUSES.includes(s);
}

export function normalizeImportedApplications(input) {
  if (!Array.isArray(input)) {
    throw new Error("Import must be a JSON array of applications.");
  }

  const now = new Date().toISOString();

  return input.map((raw, idx) => {
    const id = String(raw?.id ?? "");
    const companyName = String(raw?.companyName ?? "").trim();
    const jobTitle = String(raw?.jobTitle ?? "").trim();
    const status = isValidStatus(raw?.status) ? raw.status : "Applied";
    const appliedDate = String(raw?.appliedDate ?? "").slice(0, 10);
    const notes = String(raw?.notes ?? "");

    if (!id) throw new Error(`Item ${idx} is missing a valid 'id'.`);
    if (!companyName) throw new Error(`Item ${idx} is missing 'companyName'.`);
    if (!jobTitle) throw new Error(`Item ${idx} is missing 'jobTitle'.`);

    return {
      id,
      companyName,
      jobTitle,
      status,
      appliedDate: appliedDate || "",
      notes,
      createdAt: raw?.createdAt ? String(raw.createdAt) : now,
      updatedAt: raw?.updatedAt ? String(raw.updatedAt) : now,
    };
  });
}