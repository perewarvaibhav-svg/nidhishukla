import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="about"
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
            Who I Am
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            About <span className="text-gold">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: isDark
                    ? "rgba(200,160,0,0.15)"
                    : "rgba(200,160,0,0.1)",
                }}
              >
                👩‍💻
              </div>
              <div>
                <h3
                  className="font-display font-bold text-lg"
                  style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
                >
                  Nidhi Shukla
                </h3>
                <p className="font-body text-sm text-gold font-semibold">
                  AI & ML Student
                </p>
              </div>
            </div>

            <p
              className="font-body leading-8 text-base mb-6"
              style={{
                color: isDark ? "rgba(245,245,245,0.65)" : "rgba(26,26,26,0.7)",
              }}
            >
              I am an AI & ML student with a strong passion for technology and
              innovation. I am currently building a solid foundation in Python
              and exploring the transformative potential of Artificial
              Intelligence and Machine Learning.
            </p>
            <p
              className="font-body leading-8 text-base"
              style={{
                color: isDark ? "rgba(245,245,245,0.65)" : "rgba(26,26,26,0.7)",
              }}
            >
              My goal is to become a skilled software engineer who creates
              impactful, intelligent solutions. I believe in continuous learning
              and am driven by the challenge of building products that make a
              real difference.
            </p>

            <div className="flex gap-3 mt-8 flex-wrap">
              {[
                "🎓 CS Student",
                "🤖 AI & ML",
                "🐍 Python",
                "💡 Problem Solver",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-body text-sm font-medium px-4 py-1.5 rounded-full border"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(200,160,0,0.1)"
                      : "rgba(200,160,0,0.08)",
                    borderColor: "rgba(200,160,0,0.3)",
                    color: "#C8A000",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Decorative right side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: isDark
                  ? "rgba(200,160,0,0.05)"
                  : "rgba(200,160,0,0.04)",
                borderColor: "rgba(200,160,0,0.2)",
              }}
            >
              <p
                className="font-body text-sm leading-7 italic"
                style={{
                  color: isDark
                    ? "rgba(245,245,245,0.7)"
                    : "rgba(26,26,26,0.65)",
                }}
              >
                &ldquo;I am currently learning Python and building a strong
                foundation in Artificial Intelligence and Machine Learning.
                Passionate about creating impactful and intelligent
                solutions.&rdquo;
              </p>
              <p className="font-body font-bold text-sm mt-3 text-gold">
                — Nidhi Shukla
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Focus", value: "AI & ML" },
                { label: "Language", value: "Python" },
                { label: "Goal", value: "Software Engineer" },
                { label: "Passion", value: "Innovation" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(26,26,26,0.03)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(26,26,26,0.1)",
                  }}
                >
                  <p
                    className="font-body text-xs uppercase tracking-widest mb-1"
                    style={{
                      color: isDark
                        ? "rgba(245,245,245,0.4)"
                        : "rgba(26,26,26,0.4)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p className="font-display font-semibold text-sm text-gold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
