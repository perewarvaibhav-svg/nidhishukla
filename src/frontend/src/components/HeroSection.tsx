import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

// Replace with your actual uploaded profile image path
const PROFILE_IMAGE = "/assets/uploads/profile.png";

export function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: isDark ? "#111111" : "#f5f0e8",
      }}
    >
      {/* Vertical rule lines */}
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px opacity-20"
        style={{ backgroundColor: isDark ? "#C8A000" : "#888" }}
      />
      <div
        className="absolute right-6 md:right-12 top-0 bottom-0 w-px opacity-20"
        style={{ backgroundColor: isDark ? "#C8A000" : "#888" }}
      />

      {/* Main editorial layout */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 pt-24 pb-16 relative z-10">
        {/* Desktop: editorial grid with huge text flanking portrait */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:items-center">
          {/* Left huge text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-right"
          >
            <p
              className="font-display font-black leading-none tracking-tight"
              style={{
                fontSize: "clamp(4rem, 9vw, 9rem)",
                color: "#C8A000",
                lineHeight: 0.9,
              }}
            >
              AI
            </p>
            <p
              className="font-display font-black leading-none tracking-tight mt-2"
              style={{
                fontSize: "clamp(3rem, 6vw, 6rem)",
                color: isDark ? "#f5f5f5" : "#1a1a1a",
                lineHeight: 0.9,
              }}
            >
              &amp;
            </p>
          </motion.div>

          {/* Portrait box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <div
              className="relative mx-auto"
              style={{
                width: "280px",
                height: "350px",
                background: isDark ? "#1e1410" : "#2a1f16",
                overflow: "hidden",
              }}
            >
              {PROFILE_IMAGE ? (
                <img
                  src={PROFILE_IMAGE}
                  alt="Nidhi Shukla"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "top center" }}
                />
              ) : (
                /* Initials / avatar placeholder */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black font-display"
                    style={{
                      background: "linear-gradient(135deg, #C8A000, #8a6d00)",
                      color: isDark ? "#111" : "#fff",
                    }}
                  >
                    NS
                  </div>
                  <p
                    className="font-display text-sm font-semibold uppercase tracking-widest"
                    style={{ color: "#C8A000" }}
                  >
                    Nidhi Shukla
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right huge text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-left"
          >
            <p
              className="font-display font-black leading-none tracking-tight"
              style={{
                fontSize: "clamp(4rem, 9vw, 9rem)",
                color: "#C8A000",
                lineHeight: 0.9,
              }}
            >
              ML
            </p>
            <p
              className="font-display font-black leading-none tracking-tight mt-2"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                color: isDark ? "#f5f5f5" : "#1a1a1a",
                lineHeight: 0.95,
              }}
            >
              ENGINEER
            </p>
          </motion.div>
        </div>

        {/* Mobile layout: stacked */}
        <div className="md:hidden flex flex-col items-center text-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black"
            style={{ fontSize: "5rem", color: "#C8A000", lineHeight: 1 }}
          >
            AI & ML
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="relative mx-auto"
              style={{
                width: "200px",
                height: "240px",
                background: isDark ? "#1e1410" : "#2a1f16",
                overflow: "hidden",
              }}
            >
              {PROFILE_IMAGE ? (
                <img
                  src={PROFILE_IMAGE}
                  alt="Nidhi Shukla"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "top center" }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black font-display"
                    style={{
                      background: "linear-gradient(135deg, #C8A000, #8a6d00)",
                      color: "#111",
                    }}
                  >
                    NS
                  </div>
                  <p
                    className="font-display text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#C8A000" }}
                  >
                    Nidhi Shukla
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display font-black"
            style={{
              fontSize: "2.8rem",
              color: isDark ? "#f5f5f5" : "#1a1a1a",
              lineHeight: 1,
            }}
          >
            ENGINEER
          </motion.p>
        </div>

        {/* Bottom row: name left only */}
        <div className="flex justify-between items-end mt-10 md:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <p
              className="font-display font-bold text-base"
              style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
            >
              Nidhi Shukla
            </p>
            <p
              className="font-body text-sm italic mt-0.5"
              style={{ color: "#C8A000" }}
            >
              AI & ML Student | Future Software Engineer
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer scroll-bounce"
        data-ocid="hero.primary_button"
        aria-label="Scroll down"
      >
        <span
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: "#C8A000" }}
        >
          Scroll
        </span>
        <ChevronDown size={20} style={{ color: "#C8A000" }} />
      </motion.button>
    </section>
  );
}
