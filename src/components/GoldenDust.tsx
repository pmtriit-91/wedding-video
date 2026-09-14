import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface Particle {
  id: number;
  baseX: number; // 0 - 2560
  baseY: number; // 0 - 1440
  size: number; // 3 - 9px
  speed: number;
  swaySpeed: number;
  swayDist: number;
  opacityBase: number;
}

export const GoldenDust: React.FC<{ count?: number }> = ({ count = 40 }) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const pseudoRand1 = Math.sin(i * 997.3) * 0.5 + 0.5;
      const pseudoRand2 = Math.cos(i * 543.7) * 0.5 + 0.5;
      const pseudoRand3 = Math.sin(i * 281.1) * 0.5 + 0.5;
      const pseudoRand4 = Math.cos(i * 127.9) * 0.5 + 0.5;

      list.push({
        id: i,
        baseX: pseudoRand1 * 2560,
        baseY: pseudoRand2 * 1440,
        size: 3 + pseudoRand3 * 6,
        speed: 0.35 + pseudoRand4 * 0.45,
        swaySpeed: 0.015 + pseudoRand2 * 0.02,
        swayDist: 15 + pseudoRand1 * 25,
        opacityBase: 0.25 + pseudoRand3 * 0.45,
      });
    }
    return list;
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      {particles.map((p) => {
        // Vị trí trôi từ dưới lên trên và lặp lại
        const totalHeight = 1500;
        const currentY =
          ((p.baseY - frame * p.speed) % totalHeight + totalHeight) %
          totalHeight;
        const currentX =
          p.baseX + Math.sin(frame * p.swaySpeed + p.id) * p.swayDist;

        // Độ nhấp nháy êm dịu (smooth twinkle)
        const twinkle = Math.sin(frame * 0.04 + p.id * 1.5) * 0.25 + 0.75;
        const opacity = p.opacityBase * twinkle;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255, 235, 175, 0.95) 0%, rgba(220, 175, 95, 0.4) 60%, rgba(200, 150, 70, 0) 100%)",
              boxShadow: `0 0 ${p.size * 2.5}px rgba(235, 195, 115, 0.65)`,
              opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
};
