import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { jobReducer } from "./jobReducer.js";
import { loadApplications, saveApplications } from "./storage.js";

const JobContext = createContext(null);

const initialState = {
  applications: [],
};

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: loadApplications() });
  }, []);

  useEffect(() => {
    saveApplications(state.applications);
  }, [state.applications]);

  const api = useMemo(() => {
    return {
      applications: state.applications,

      addApplication(app) {
        dispatch({ type: "ADD", payload: app });
      },

      updateApplication(app) {
        dispatch({ type: "UPDATE", payload: app });
      },

      deleteApplication(id) {
        dispatch({ type: "DELETE", payload: id });
      },

      importReplace(apps) {
        dispatch({ type: "IMPORT_REPLACE", payload: apps });
      },
    };
  }, [state.applications]);

  return <JobContext.Provider value={api}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJobs must be used within a JobProvider");
  return ctx;
}