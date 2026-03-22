import { useEffect, useMemo } from "react";

interface ConfettiEffectProps {
  active: boolean;
  onComplete: () => void;
}

export function ConfettiEffect({ active, onComplete }: ConfettiEffectProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: [
          "#FF6B6B",
          "#4ECDC4",
          "#FFD700",
          "#FF69B4",
          "#00CED1",
          "#FFA500",
        ][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.8,
        duration: 1.5 + Math.random() * 1.2,
        size: Math.random() * 6 + 5,
        isCircle: Math.random() > 0.5,
        sway: Math.random() * 40 - 20,
      })),
    [],
  );

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? "50%" : "2px",
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards, confettiSway ${p.duration * 0.6}s ${p.delay}s ease-in-out infinite`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}
