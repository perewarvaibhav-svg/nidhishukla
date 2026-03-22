import { Lock, Unlock } from "lucide-react";
import { motion } from "motion/react";
import { usePortfolioStore } from "../store/usePortfolioStore";

export function AchievementsSection() {
  const achievements = usePortfolioStore((s) => s.achievements);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <section id="achievements" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="font-body text-sm font-bold uppercase tracking-widest text-coral mb-2">
            Drive to Unlock
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
            Achievements &amp; <span className="text-teal">Milestones</span>
          </h2>
          <p className="font-body text-gray-500 mt-4">
            {unlockedCount} / {achievements.length} unlocked — explore the 3D
            world to earn them all!
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto mb-14"
        >
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${(unlockedCount / achievements.length) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-coral to-teal"
            />
          </div>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          data-ocid="achievements.list"
        >
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              data-ocid={`achievements.item.${i + 1}`}
              className={`relative rounded-2xl p-5 border-2 transition-all duration-300 ${
                ach.unlocked
                  ? "bg-white border-teal/40 shadow-md"
                  : "bg-white border-dashed border-gray-200 opacity-60"
              }`}
            >
              {/* Lock/unlock icon */}
              <div className="absolute top-4 right-4">
                {ach.unlocked ? (
                  <Unlock size={14} className="text-teal" />
                ) : (
                  <Lock size={14} className="text-gray-300" />
                )}
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 ${
                  ach.unlocked ? "bg-teal/10" : "bg-gray-100"
                }`}
              >
                {ach.unlocked ? ach.icon : "🔒"}
              </div>

              <h3
                className={`font-display font-bold text-sm mb-1 ${
                  ach.unlocked ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {ach.name}
              </h3>
              <p className="font-body text-xs text-gray-400 leading-snug">
                {ach.description}
              </p>

              {ach.unlocked && (
                <div className="mt-3 text-xs font-body font-bold text-teal uppercase tracking-wider">
                  ✓ Unlocked
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
