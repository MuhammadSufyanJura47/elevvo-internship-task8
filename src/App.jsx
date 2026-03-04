import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddJob from "./pages/AddJob.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Background from "./three/Background.jsx";

function Page({ children }) {
  return (
    <motion.div
      className="min-h-[calc(100vh-72px)]"
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen text-zinc-100">
      <Background />
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Page>
                  <Dashboard />
                </Page>
              }
            />
            <Route
              path="/add"
              element={
                <Page>
                  <AddJob />
                </Page>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <Page>
                  <JobDetails />
                </Page>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}