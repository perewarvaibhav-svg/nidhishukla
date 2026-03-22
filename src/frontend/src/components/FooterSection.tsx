import { Heart } from "lucide-react";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white py-12 px-6" id="footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-display text-lg font-bold mb-1">
              <span className="text-gold">NIDHI</span>
              <span className="text-white ml-1">SHUKLA</span>
            </h3>
            <p className="font-body text-white/40 text-xs">
              AI & ML Student | Future Software Engineer
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {[
              "About",
              "Skills",
              "Experience",
              "Projects",
              "Hackathon",
              "Certificates",
              "Contact",
            ].map((link) => (
              <button
                key={link}
                type="button"
                onClick={() =>
                  document
                    .getElementById(link.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-body text-white/40 hover:text-gold transition-colors text-xs"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            <a
              href="https://github.com/Nidhi-1012"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors group"
              data-ocid="footer.github.link"
            >
              <SiGithub
                size={16}
                className="text-white/50 group-hover:text-gold transition-colors"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/nidhii-shukla-179062397"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors group"
              data-ocid="footer.linkedin.link"
            >
              <SiLinkedin
                size={16}
                className="text-white/50 group-hover:text-gold transition-colors"
              />
            </a>
            <a
              href="https://www.instagram.com/shukla_nidhii"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors group"
              data-ocid="footer.instagram.link"
            >
              <SiInstagram
                size={16}
                className="text-white/50 group-hover:text-gold transition-colors"
              />
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/30 text-xs">
            © {year} Nidhi Shukla. Built with passion{" "}
            <Heart size={10} className="inline text-gold" />
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="font-body text-white/25 text-xs hover:text-white/45 transition-colors flex items-center gap-1"
          >
            Built with <Heart size={10} className="text-gold" /> using
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
