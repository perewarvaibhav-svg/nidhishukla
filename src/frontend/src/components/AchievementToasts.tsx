import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { usePortfolioStore } from "../store/usePortfolioStore";

export function AchievementToasts() {
  const toasts = usePortfolioStore((s) => s.toasts);
  const removeToast = usePortfolioStore((s) => s.removeToast);

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => removeToast(latest.id), 4000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none"
      data-ocid="achievement.toast"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-[#1a0d2e] border border-teal/40 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl min-w-[260px] pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-xl shrink-0">
              {toast.achievementIcon}
            </div>
            <div>
              <p className="font-body text-xs text-teal font-bold uppercase tracking-widest">
                Achievement Unlocked!
              </p>
              <p className="font-display font-bold text-white text-sm">
                {toast.achievementName}
              </p>
              <p className="font-body text-white/60 text-xs">
                {toast.achievementDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
