import { Github, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_1p5l3ry";
const EMAILJS_TEMPLATE_ID = "template_ubajtmm";
const EMAILJS_PUBLIC_KEY = "qOa7tE8Gk-oq_t_7C";

/** Send via EmailJS REST API (no SDK required) */
async function sendEmail(params: {
  from_name: string;
  from_email: string;
  message: string;
}) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
}

export function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: "", gmail: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await sendEmail({
        from_name: form.name,
        from_email: form.gmail,
        message: form.message,
      });
      setSubmitted(true);
      setForm({ name: "", gmail: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Failed to send. Please try again or reach out directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    backgroundColor: isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.9)",
    borderColor: isDark ? "rgba(200,160,0,0.2)" : "rgba(200,160,0,0.25)",
    color: isDark ? "#f5f5f5" : "#1a1a1a",
  };

  const SOCIALS = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nidhii-shukla-179062397",
      icon: Linkedin,
      color: "#0077B5",
    },
    {
      label: "GitHub",
      href: "https://github.com/Nidhi-1012",
      icon: Github,
      color: isDark ? "#f5f5f5" : "#1a1a1a",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/shukla_nidhii",
      icon: Instagram,
      color: "#E1306C",
    },
    {
      label: "Gmail",
      href: "mailto:nidhishukla@gmail.com",
      icon: Mail,
      color: "#EA4335",
    },
  ];

  return (
    <section
      id="contact"
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
            Get In Touch
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            Let&apos;s <span className="text-gold">Connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="font-body text-xs uppercase tracking-widest mb-2 block"
                style={{
                  color: isDark
                    ? "rgba(245,245,245,0.5)"
                    : "rgba(26,26,26,0.5)",
                }}
              >
                Name
              </label>
              <input
                id="contact-name"
                name="from_name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded font-body text-sm outline-none border focus:border-gold transition-colors"
                style={inputStyle}
                data-ocid="contact.input"
              />
            </div>

            {/* Gmail */}
            <div>
              <label
                htmlFor="contact-gmail"
                className="font-body text-xs uppercase tracking-widest mb-2 block"
                style={{
                  color: isDark
                    ? "rgba(245,245,245,0.5)"
                    : "rgba(26,26,26,0.5)",
                }}
              >
                Gmail
              </label>
              <input
                id="contact-gmail"
                name="from_email"
                type="email"
                required
                placeholder="your.email@gmail.com"
                value={form.gmail}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gmail: e.target.value }))
                }
                className="w-full px-4 py-3 rounded font-body text-sm outline-none border focus:border-gold transition-colors"
                style={inputStyle}
                data-ocid="contact.gmail_input"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="font-body text-xs uppercase tracking-widest mb-2 block"
                style={{
                  color: isDark
                    ? "rgba(245,245,245,0.5)"
                    : "rgba(26,26,26,0.5)",
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Write your message..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded font-body text-sm outline-none border focus:border-gold transition-colors resize-none"
                style={inputStyle}
                data-ocid="contact.textarea"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center gap-2 font-display font-bold text-sm px-8 py-3 rounded transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#C8A000", color: "#111" }}
              data-ocid="contact.submit_button"
            >
              {sending ? (
                "Sending..."
              ) : submitted ? (
                "Message Sent! ✓"
              ) : (
                <>
                  <Send size={14} /> Send Message
                </>
              )}
            </button>

            {submitted && (
              <p
                className="font-body text-sm text-gold text-center"
                data-ocid="contact.success_state"
              >
                Thank you! I&apos;ll get back to you soon.
              </p>
            )}

            {error && (
              <p
                className="font-body text-sm text-center"
                style={{ color: "#FF6B6B" }}
                data-ocid="contact.error_state"
              >
                {error}
              </p>
            )}
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p
              className="font-body text-sm mb-4"
              style={{
                color: isDark ? "rgba(245,245,245,0.6)" : "rgba(26,26,26,0.65)",
              }}
            >
              Feel free to reach out through any of these channels. I&apos;m
              always open to discussing new opportunities, projects, or just
              having a chat about tech!
            </p>

            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded border transition-all hover:scale-[1.02] group"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                }}
                data-ocid={`contact.${social.label.toLowerCase()}.link`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ backgroundColor: `${social.color}18` }}
                >
                  <social.icon size={18} style={{ color: social.color }} />
                </div>
                <span
                  className="font-display font-semibold text-sm"
                  style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
                >
                  {social.label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
