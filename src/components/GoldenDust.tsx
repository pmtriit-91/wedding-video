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
              left: 0,
              top: 0,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255, 242, 195, 0.95) 0%, rgba(230, 185, 105, 0.45) 50%, rgba(200, 150, 70, 0) 100%)",
              opacity,
              transform: `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          />
        );
      })}
    </div>
  );
};
