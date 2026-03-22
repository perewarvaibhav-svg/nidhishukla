import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const CERTIFICATE_IMAGE = "/assets/uploads/certificate.png";

export function CertificatesSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="certificates"
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
            Learning & Growth
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            My <span className="text-gold">Certificates</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg overflow-hidden border mx-auto"
          style={{
            borderColor: isDark
              ? "rgba(200,160,0,0.2)"
              : "rgba(200,160,0,0.25)",
            maxWidth: "700px",
          }}
        >
          <img
            src={CERTIFICATE_IMAGE}
            alt="Certificate of Appreciation – Nidhi Shukla"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
