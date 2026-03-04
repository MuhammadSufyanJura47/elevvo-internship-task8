import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-glow backdrop-blur"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="text-base font-semibold">{title}</div>
            <div className="mt-2 text-sm text-zinc-300">{description}</div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
                onClick={onClose}
                type="button"
              >
                {cancelText}
              </button>
              <button
                className="rounded-xl bg-rose-500/90 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                onClick={() => {
                  onConfirm?.();
                  onClose?.();
                }}
                type="button"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}