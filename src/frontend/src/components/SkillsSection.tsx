import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const HARD_SKILLS = [
  { name: "C Programming", icon: "⚙️" },
  { name: "Python", icon: "🐍" },
];

const SOFT_SKILLS = [
  { name: "Communication", icon: "💬" },
  { name: "Teamwork", icon: "🤝" },
  { name: "Leadership", icon: "🌟" },
  { name: "Adaptability", icon: "🔄" },
];

const EXTRA_SKILLS = [
  {
    name: "Kickboxer — State Level Gold Medalist",
    icon: "🥊",
  },
  { name: "Karate", icon: "🥋" },
  { name: "MMA", icon: "🏆" },
  { name: "National Level Yoga Artist", icon: "🧘" },
  { name: "Singer & Dancer", icon: "🎵" },
];

interface SkillChipProps {
  name: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
}

function SkillChip({ name, icon, color, bg, border }: SkillChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-body text-sm font-medium px-3 py-1.5 rounded-full border"
      style={{ color, backgroundColor: bg, borderColor: border }}
    >
      <span>{icon}</span>
      {name}
    </span>
  );
}

export function SkillsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Gold color for all Extra-Curricular chips — matches the portfolio theme
  const extraColor = "#C8A000";
  const extraBg = isDark ? "rgba(200,160,0,0.12)" : "rgba(200,160,0,0.1)";
  const extraBorder = "rgba(200,160,0,0.35)";

  return (
    <section
      id="skills"
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
            What I Know
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            My <span className="text-gold">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8" data-ocid="skills.list">
          {/* Hard Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(255,255,255,0.8)",
              borderColor: isDark
                ? "rgba(200,160,0,0.25)"
                : "rgba(200,160,0,0.3)",
            }}
            data-ocid="skills.item.1"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">💻</span>
              <h3
                className="font-display font-bold text-lg"
                style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
              >
                Hard Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {HARD_SKILLS.map((skill) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color="#C8A000"
                  bg={isDark ? "rgba(200,160,0,0.1)" : "rgba(200,160,0,0.08)"}
                  border="rgba(200,160,0,0.3)"
                />
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(255,255,255,0.8)",
              borderColor: isDark
                ? "rgba(78,205,196,0.25)"
                : "rgba(78,205,196,0.3)",
            }}
            data-ocid="skills.item.2"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">🧠</span>
              <h3
                className="font-display font-bold text-lg"
                style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
              >
                Soft Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((skill) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color="#4ECDC4"
                  bg={isDark ? "rgba(78,205,196,0.1)" : "rgba(78,205,196,0.08)"}
                  border="rgba(78,205,196,0.3)"
                />
              ))}
            </div>
          </motion.div>

          {/* Extra-Curricular */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(255,255,255,0.8)",
              borderColor: isDark
                ? "rgba(200,160,0,0.25)"
                : "rgba(200,160,0,0.3)",
            }}
            data-ocid="skills.item.3"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">⭐</span>
              <h3
                className="font-display font-bold text-lg"
                style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
              >
                Extra-Curricular
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {EXTRA_SKILLS.map((skill) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={extraColor}
                  bg={extraBg}
                  border={extraBorder}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
