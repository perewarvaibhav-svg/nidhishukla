import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function ExperienceSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="experience"
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
            My Journey
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            Work <span className="text-gold">Experience</span>
          </h2>
        </motion.div>

        <div className="relative" data-ocid="experience.list">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{
              backgroundColor: isDark
                ? "rgba(200,160,0,0.2)"
                : "rgba(200,160,0,0.3)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pl-16 pb-8 relative"
            data-ocid="experience.item.1"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-[19px] top-1.5 w-3 h-3 rounded-full border-2"
              style={{
                backgroundColor: "#C8A000",
                borderColor: isDark ? "#161616" : "#fff",
              }}
            />

            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.9)",
                borderColor: isDark
                  ? "rgba(200,160,0,0.2)"
                  : "rgba(200,160,0,0.25)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(200,160,0,0.15)" }}
                  >
                    <Briefcase size={18} style={{ color: "#C8A000" }} />
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-lg"
                      style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
                    >
                      Full stack Developer Intern
                    </h3>
                    <p className="font-body font-semibold text-gold text-sm">
                      Evolve X
                    </p>
                  </div>
                </div>
                <span
                  className="font-body text-xs font-medium px-3 py-1 rounded-full self-start"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(200,160,0,0.1)"
                      : "rgba(200,160,0,0.08)",
                    color: "#C8A000",
                    border: "1px solid rgba(200,160,0,0.25)",
                  }}
                >
                  Internship
                </span>
              </div>
              <p
                className="font-body text-sm leading-7"
                style={{
                  color: isDark
                    ? "rgba(245,245,245,0.6)"
                    : "rgba(26,26,26,0.65)",
                }}
              >
                Worked on real-world projects, gained exposure to industry
                practices, and enhanced technical and problem-solving skills.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
