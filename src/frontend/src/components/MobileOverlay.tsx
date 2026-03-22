import { Monitor, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function MobileOverlay() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-[#0E0B14]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center md:hidden"
        data-ocid="mobile.modal"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          <div className="w-20 h-20 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center mx-auto mb-6">
            <Monitor size={36} className="text-teal" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Best on Desktop 🎮
          </h2>
          <p className="font-body text-white/70 text-base leading-relaxed mb-2">
            This portfolio features a{" "}
            <span className="text-teal font-semibold">driveable 3D world</span>{" "}
            with keyboard controls (WASD + Space + Shift).
          </p>
          <p className="font-body text-white/50 text-sm mb-8">
            For the full experience, visit on a desktop with a keyboard ⌨️
          </p>

          <div className="bg-white/5 rounded-2xl p-4 mb-8 text-left">
            <p className="font-body text-xs text-teal font-semibold uppercase tracking-wider mb-2">
              Controls
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/60 font-body">
              <span>🎮 WASD / Arrows &mdash; Drive</span>
              <span>🚀 Space &mdash; Boost</span>
              <span>🛑 Shift &mdash; Brake</span>
              <span>🗺️ M &mdash; Mini-map</span>
              <span>🔄 R &mdash; Reset</span>
              <span>🌧️ Rain toggle in HUD</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="bg-coral text-white font-display font-bold px-8 py-3.5 rounded-full flex items-center gap-2 mx-auto hover:bg-coral/90 transition-colors"
            data-ocid="mobile.close_button"
          >
            <X size={16} /> Continue Anyway
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
