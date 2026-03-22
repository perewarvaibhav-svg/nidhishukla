import { MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePortfolioStore } from "../store/usePortfolioStore";

const STORAGE_KEY = "nidhii-whispers";

interface Whisper {
  id: string;
  text: string;
  timestamp: number;
  name: string;
}

function loadWhispers(): Whisper[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Whisper[]) : [];
  } catch {
    return [];
  }
}

function saveWhispers(whispers: Whisper[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(whispers.slice(-20)));
  } catch {
    // ignore
  }
}

export function WhispersSection() {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const unlockAchievement = usePortfolioStore((s) => s.unlockAchievement);

  useEffect(() => {
    setWhispers(loadWhispers());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newWhisper: Whisper = {
      id: `${Date.now()}`,
      text: text.trim(),
      timestamp: Date.now(),
      name: name.trim() || "Anonymous",
    };

    const updated = [newWhisper, ...whispers].slice(0, 20);
    setWhispers(updated);
    saveWhispers(updated);
    setText("");
    setSubmitted(true);
    unlockAchievement("whisper-master");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section id="contact" className="bg-[#0E0B14] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm font-bold uppercase tracking-widest text-coral mb-2">
            Leave a Mark
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Whisper in <span className="text-teal">Nidhii&apos;s World</span>
          </h2>
          <p className="font-body text-white/50 mt-3 text-sm flex items-center justify-center gap-2">
            <MessageCircle size={14} /> 100% local — stored only in your
            browser, no server needed
          </p>
        </motion.div>

        {/* Input form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm outline-none focus:border-teal/60 transition-colors"
              data-ocid="whispers.input"
            />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a whisper in Nidhii's world..."
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm outline-none focus:border-teal/60 transition-colors resize-none mb-3"
            data-ocid="whispers.textarea"
          />
          <div className="flex items-center justify-between">
            <span className="font-body text-white/30 text-xs">
              {text.length}/280
            </span>
            <motion.button
              type="submit"
              disabled={!text.trim()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-teal text-[#0E0B14] font-display font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              data-ocid="whispers.submit_button"
            >
              {submitted ? (
                <>✨ Whispered!</>
              ) : (
                <>
                  <Send size={14} /> Whisper
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Whispers list */}
        {whispers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-3"
            data-ocid="whispers.list"
          >
            <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-4">
              {whispers.length} whisper{whispers.length !== 1 ? "s" : ""} in
              this world
            </p>
            {whispers.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`whispers.item.${i + 1}`}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-semibold text-teal text-sm">
                    {w.name}
                  </span>
                  <span className="font-body text-white/30 text-xs">
                    {formatTime(w.timestamp)}
                  </span>
                </div>
                <p className="font-body text-white/70 text-sm leading-relaxed">
                  {w.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {whispers.length === 0 && (
          <div
            className="text-center text-white/30 font-body text-sm py-8"
            data-ocid="whispers.empty_state"
          >
            No whispers yet. Be the first! 🌠
          </div>
        )}
      </div>
    </section>
  );
}
