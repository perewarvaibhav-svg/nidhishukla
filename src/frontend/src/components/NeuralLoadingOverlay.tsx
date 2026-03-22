import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Training Model...",
  "Loading Intelligence...",
  "Launching Experience...",
];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

export function NeuralLoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  // Init nodes
  useEffect(() => {
    const initNodes = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      nodesRef.current = Array.from({ length: 42 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: 2 + Math.random() * 2.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      }));
    };
    initNodes();
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const MAX_DIST = 150;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }

      // Draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.55;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(200, 160, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseFactor = 1 + 0.3 * Math.sin(node.pulse);
        const r = node.radius * pulseFactor;

        // Glow
        const grd = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r * 3,
        );
        grd.addColorStop(0, "rgba(200,160,0,0.45)");
        grd.addColorStop(1, "rgba(200,160,0,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,160,0,0.9)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Message cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  // Fade-out timing
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3700);
    const unmountTimer = setTimeout(() => setVisible(false), 4300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
      data-ocid="neural_overlay.panel"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            color: "#C8A000",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textShadow: "0 0 40px rgba(200,160,0,0.4)",
          }}
        >
          NS
        </div>

        {/* Spinner ring */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "2px solid rgba(200,160,0,0.15)",
            borderTop: "2px solid #C8A000",
            animation: "neural-spin 0.9s linear infinite",
          }}
        />

        {/* Cycling text */}
        <p
          key={msgIndex}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(200,160,0,0.75)",
            animation: "neural-fadein 0.4s ease",
          }}
        >
          {MESSAGES[msgIndex]}
        </p>
      </div>

      <style>{`
        @keyframes neural-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes neural-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
