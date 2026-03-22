import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const HACKATHON_IMAGE = "/assets/uploads/certificate.png";

export function HackathonSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="hackathon"
      className="py-24 px-6"
      style={{ backgroundColor: isDark ? "#161616" : "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Competition
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            Hackathon <span className="text-gold">Achievements</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto" data-ocid="hackathon.list">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border overflow-hidden"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(255,255,255,0.9)",
              borderColor: isDark
                ? "rgba(200,160,0,0.2)"
                : "rgba(200,160,0,0.25)",
            }}
            data-ocid="hackathon.item.1"
          >
            <img
              src={HACKATHON_IMAGE}
              alt="Hackathon Certificate"
              className="w-full h-auto object-contain"
            />

            <div className="p-5">
              <h3
                className="font-display font-bold text-base mb-2"
                style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
              >
                National Level Hackathon
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{
                  color: isDark
                    ? "rgba(245,245,245,0.6)"
                    : "rgba(26,26,26,0.65)",
                }}
              >
                Participated in a national-level hackathon, collaborating with a
                team to build innovative solutions under time constraints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
