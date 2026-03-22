import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const GALLERY_IMAGES = [
  { id: "g1", src: "/assets/uploads/image-3-1.png", alt: "Gallery photo 1" },
  { id: "g2", src: "/assets/uploads/image-4-2.png", alt: "Gallery photo 2" },
  { id: "g3", src: "/assets/uploads/image-5-3.png", alt: "Gallery photo 3" },
  { id: "g4", src: "/assets/uploads/image-6-4.png", alt: "Gallery photo 4" },
];

export function GallerySection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = GALLERY_IMAGES.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
  };

  return (
    <section
      id="gallery"
      className="py-24 px-6"
      style={{ backgroundColor: isDark ? "#0d0d0d" : "#faf7f2" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Moments &amp; Memories
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "#1a1a1a" }}
          >
            My <span className="text-gold">Gallery</span>
          </h2>
        </motion.div>

        {/* Carousel container */}
        <div className="relative" data-ocid="gallery.panel">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-gold/50 text-gold bg-black/40 backdrop-blur-sm hover:bg-gold hover:text-black hover:shadow-[0_0_14px_rgba(200,160,0,0.6)] transition-all duration-250 -ml-4 md:-ml-5"
            style={{ touchAction: "manipulation" }}
            data-ocid="gallery.pagination_prev"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Track wrapper */}
          <div
            className="overflow-hidden mx-8 md:mx-12 rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding track */}
            <div
              className="flex"
              style={{
                transform: `translateX(-${current * 100}%)`,
                transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={img.id}
                  className="w-full flex-shrink-0 px-2"
                  data-ocid={`gallery.item.${i + 1}`}
                >
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      transition: "box-shadow 0.35s ease, transform 0.35s ease",
                      transform: i === current ? "scale(1.02)" : "scale(0.97)",
                      boxShadow:
                        i === current
                          ? "0 0 32px 8px rgba(200,160,0,0.25)"
                          : "none",
                      /* Fixed aspect ratio container for consistent sizing */
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-gold/50 text-gold bg-black/40 backdrop-blur-sm hover:bg-gold hover:text-black hover:shadow-[0_0_14px_rgba(200,160,0,0.6)] transition-all duration-250 -mr-4 md:-mr-5"
            style={{ touchAction: "manipulation" }}
            data-ocid="gallery.pagination_next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  i === current
                    ? "#C8A000"
                    : isDark
                      ? "rgba(200,160,0,0.3)"
                      : "rgba(200,160,0,0.4)",
                boxShadow:
                  i === current ? "0 0 8px 2px rgba(200,160,0,0.45)" : "none",
                touchAction: "manipulation",
              }}
              data-ocid="gallery.toggle"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
