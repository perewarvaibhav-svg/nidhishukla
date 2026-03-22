import { Clock, Github } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const PROJECTS = [
  {
    id: "dfth",
    title: "DFTH – Direct Farm To Home",
    description:
      "A platform designed to connect farmers directly with consumers, enabling fresh fruits and vegetables to be delivered from farm to home efficiently.",
    tags: ["Python", "AI/ML", "Coming Soon"],
    icon: "🌾",
    githubUrl: null,
    upcoming: true,
  },
];

export function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="projects"
      className="py-24 px-6"
      style={{ backgroundColor: isDark ? "#111111" : "#f5f0e8" }}
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
            What I&apos;ve Built
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            Featured <span className="text-gold">Projects</span>
          </h2>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="projects.list"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`projects.item.${i + 1}`}
              className="group rounded-lg border overflow-hidden"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.9)",
                borderColor: project.upcoming
                  ? isDark
                    ? "rgba(200,160,0,0.4)"
                    : "rgba(200,160,0,0.5)"
                  : isDark
                    ? "rgba(200,160,0,0.2)"
                    : "rgba(200,160,0,0.25)",
              }}
            >
              {/* Icon header */}
              <div
                className="h-40 flex items-center justify-center relative"
                style={
                  isDark
                    ? {
                        background: project.upcoming
                          ? "linear-gradient(135deg, rgba(200,160,0,0.18), rgba(200,160,0,0.06))"
                          : "linear-gradient(135deg, rgba(200,160,0,0.12), rgba(200,160,0,0.04))",
                      }
                    : {
                        background: project.upcoming
                          ? "linear-gradient(135deg, rgba(200,160,0,0.15), rgba(200,160,0,0.05))"
                          : "linear-gradient(135deg, rgba(200,160,0,0.1), rgba(200,160,0,0.03))",
                      }
                }
              >
                <span className="text-6xl float-anim select-none">
                  {project.icon}
                </span>
                {project.upcoming && (
                  <span
                    className="absolute top-3 right-3 flex items-center gap-1 font-body text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(200,160,0,0.18)"
                        : "rgba(200,160,0,0.12)",
                      color: "#C8A000",
                      border: "1px solid rgba(200,160,0,0.4)",
                    }}
                  >
                    <Clock size={10} /> Upcoming
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed mb-4"
                  style={{
                    color: isDark
                      ? "rgba(245,245,245,0.6)"
                      : "rgba(26,26,26,0.65)",
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(200,160,0,0.1)"
                          : "rgba(200,160,0,0.08)",
                        color: "#C8A000",
                        border: "1px solid rgba(200,160,0,0.25)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-body font-semibold text-sm px-4 py-2 rounded transition-all"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(200,160,0,0.12)"
                          : "rgba(200,160,0,0.1)",
                        color: "#C8A000",
                        border: "1px solid rgba(200,160,0,0.3)",
                      }}
                      data-ocid={`projects.item.${i + 1}.button`}
                    >
                      <Github size={14} /> GitHub
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-1.5 font-body font-semibold text-sm px-4 py-2 rounded opacity-50 cursor-default select-none"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(200,160,0,0.06)"
                          : "rgba(200,160,0,0.05)",
                        color: "#C8A000",
                        border: "1px solid rgba(200,160,0,0.2)",
                      }}
                    >
                      <Clock size={14} /> In Progress
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
