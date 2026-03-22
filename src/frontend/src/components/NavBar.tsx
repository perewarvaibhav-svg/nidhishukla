import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Hackathon", id: "hackathon" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

/** Safe smooth-scroll with fixed navbar offset */
function scrollToSection(id: string) {
  console.log(`[NavBar] scrollToSection called for: "${id}"`);

  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }

  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("[NavBar] Scrolling to top (home)");
    return;
  }

  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[NavBar] Section not found: #${id}`);
    return;
  }

  const navHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  console.log(`[NavBar] Scrolling to #${id}, offset top: ${top}`);
  window.scrollTo({ top, behavior: "smooth" });
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const activeSectionRef = useRef("home");

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: track which section occupies the most viewport real estate
  // Uses Intersection Observer with scroll-position fallback for correctness.
  useEffect(() => {
    // Map of section id -> current intersection ratio
    const ratioMap = new Map<string, number>();

    // Initialise all sections to 0
    for (const { id } of NAV_LINKS) ratioMap.set(id, 0);

    function pickActive() {
      // 1. Among sections that are visible, pick the one that is highest on screen
      //    (smallest offsetTop that is still ≥ scrollY - small tolerance).
      //    This prevents flickering when two sections are simultaneously observed.
      const scrollY = window.scrollY;
      const vpH = window.innerHeight;
      const navH = 80;

      let bestId = "home";
      let bestScore = Number.NEGATIVE_INFINITY;

      for (const { id } of NAV_LINKS) {
        const el = id === "home" ? null : document.getElementById(id);
        if (id === "home") {
          // home is active when near the top
          if (scrollY < 100) {
            console.log(`[ScrollSpy] home wins (scrollY=${scrollY})`);
            setActiveSection("home");
            activeSectionRef.current = "home";
            return;
          }
          continue;
        }
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // How many pixels of the section are within the viewport (below navbar)
        const visibleTop = Math.max(rect.top, navH);
        const visibleBottom = Math.min(rect.bottom, vpH);
        const visiblePx = Math.max(0, visibleBottom - visibleTop);

        // Score = visible pixels weighted toward sections whose top edge is higher
        const score = visiblePx - Math.max(0, rect.top - navH) * 0.1;

        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }

      if (bestId !== activeSectionRef.current) {
        console.log(`[ScrollSpy] active → ${bestId}`);
        activeSectionRef.current = bestId;
        setActiveSection(bestId);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        }
        pickActive();
      },
      {
        // -80px top so sections activate when they clear the navbar
        rootMargin: "-80px 0px -20% 0px",
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.75, 1],
      },
    );

    for (const { id } of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      } else if (id !== "home") {
        console.warn(`[ScrollSpy] Section element not found: #${id}`);
      }
    }

    // Fallback: also listen to scroll for sections missed by IO
    const onScroll = () => pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Run once on mount
    pickActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Handle nav link click – works for both mouse and touch */
  const handleNavClick = (id: string) => {
    console.log(`[NavBar] Link clicked: "${id}", closing menu: ${menuOpen}`);
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id), 50);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ zIndex: 100 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="font-display text-lg font-bold tracking-wide select-none bg-transparent border-none cursor-pointer"
          style={{
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
          data-ocid="nav.link"
        >
          <span className="text-gold">NIDHI</span>
          <span className="text-foreground ml-1">SHUKLA</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                type="button"
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
                className={[
                  "relative font-body text-xs font-medium uppercase tracking-widest px-3 py-2 rounded",
                  "transition-all duration-300",
                  isActive ? "text-gold" : "text-foreground/70 hover:text-gold",
                ].join(" ")}
                data-ocid={`nav.${link.id}.link`}
              >
                {link.label}
                <span
                  className={[
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full",
                    "bg-gold transition-all duration-300",
                    isActive
                      ? "w-4/5 shadow-[0_0_6px_2px_rgba(212,175,55,0.55)]"
                      : "w-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        {/* Right: theme toggle + mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-gold/30 hover:border-gold/70 text-gold transition-all"
            data-ocid="nav.theme.toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => {
              console.log(`[NavBar] Hamburger clicked, menuOpen: ${menuOpen}`);
              setMenuOpen((prev) => !prev);
            }}
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-foreground"
            data-ocid="nav.mobile.button"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ pointerEvents: "auto", zIndex: 100 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    pointerEvents: "auto",
                    cursor: "pointer",
                  }}
                  className={[
                    "relative text-left font-body font-medium uppercase tracking-widest text-sm py-3",
                    "transition-all duration-300 pl-3 border-l-2",
                    isActive
                      ? "text-gold border-gold shadow-[inset_0_0_8px_rgba(212,175,55,0.15)]"
                      : "text-foreground/70 border-transparent hover:text-gold hover:border-gold/40",
                  ].join(" ")}
                  data-ocid={`nav.${link.id}.mobile.link`}
                >
                  {link.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
