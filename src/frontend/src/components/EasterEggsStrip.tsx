import { motion } from "motion/react";
import { usePortfolioStore } from "../store/usePortfolioStore";

const EASTER_EGGS = [
  {
    id: "historic",
    emoji: "🕌",
    name: "Charminar",
    hint: "Drive over the golden monument",
  },
  {
    id: "chai-lover",
    emoji: "☕",
    name: "Chai Cart",
    hint: "Crash into the chai stall",
  },
  {
    id: "foodie",
    emoji: "🍛",
    name: "Biryani Bowl",
    hint: "Find the hidden orange sphere",
  },
  {
    id: "road-rage",
    emoji: "🛺",
    name: "Auto-Rickshaw",
    hint: "Honk at the yellow auto",
  },
];

export function EasterEggsStrip() {
  const achievements = usePortfolioStore((s) => s.achievements);
  const isUnlocked = (id: string) =>
    achievements.some((a) => a.id === id && a.unlocked);

  return (
    <section id="hyderabad" className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm font-bold uppercase tracking-widest text-teal mb-2">
            Hyderabad Secrets
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Easter Eggs 🥚
          </h2>
          <p className="font-body text-gray-500 mt-3 text-sm">
            Find them in the 3D world above!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-[#0E0B14] to-[#2A0F4A] rounded-3xl p-6 flex flex-wrap justify-center gap-4"
        >
          {EASTER_EGGS.map((egg, i) => (
            <motion.div
              key={egg.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
              className={`flex flex-col items-center gap-2 bg-white/10 rounded-2xl px-6 py-4 min-w-[120px] transition-all duration-300 ${
                isUnlocked(egg.id)
                  ? "border-2 border-teal/60 bg-teal/10"
                  : "border border-white/10 hover:bg-white/15"
              }`}
            >
              <span className="text-4xl">{egg.emoji}</span>
              <span className="font-display font-bold text-white text-sm">
                {egg.name}
              </span>
              <span className="font-body text-white/50 text-xs text-center leading-tight">
                {egg.hint}
              </span>
              {isUnlocked(egg.id) && (
                <span className="text-teal text-xs font-body font-bold">
                  ✓ Found!
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
