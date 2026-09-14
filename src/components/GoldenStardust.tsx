import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface GoldenStardustProps {
  starCount?: number;
  grainCount?: number;
  speed?: number;
  opacity?: number;
  showSunbeam?: boolean;
  zIndex?: number;
}

interface StarSpec {
  id: number;
  initialXPercent: number; // 0 - 100%
  initialYPercent: number; // 0 - 100%
  size: number; // 8 - 18px
  durationFrames: number; // 240 - 360 frames
  phase: number;
  driftX: number; // px di chuyển ngang (-80 đến -160px)
  driftY: number; // px di chuyển dọc (100 đến 220px)
  rotSpeed: number;
}

interface GrainSpec {
  id: number;
  initialXPercent: number;
  initialYPercent: number;
  size: number; // 3 - 6px
  durationFrames: number;
  phase: number;
  driftX: number;
  driftY: number;
}

// 26 tiểu sao 4 cánh lấp lánh (kích thước 12 - 24px với tâm sáng kim cương)
const STARS: StarSpec[] = Array.from({ length: 26 }, (_, i) => {
  return {
    id: i,
    initialXPercent: (8 + (i * 16) % 84),
    initialYPercent: (4 + (i * 21) % 88),
    size: 13 + (i % 5) * 3.5, // 13px - 27px
    durationFrames: 220 + (i % 6) * 25,
    phase: (i * 0.11) % 1,
    driftX: -70 - (i % 4) * 25,
    driftY: 110 + (i % 5) * 30,
    rotSpeed: (i % 2 === 0 ? 1 : -1) * (0.9 + (i % 3) * 0.5),
  };
});

// 30 hạt bụi cát vàng óng ánh
const GRAINS: GrainSpec[] = Array.from({ length: 30 }, (_, i) => {
  return {
    id: i,
    initialXPercent: (5 + (i * 13) % 90),
    initialYPercent: (8 + (i * 19) % 86),
    size: 3 + (i % 3) * 1.5,
    durationFrames: 200 + (i % 5) * 30,
    phase: (i * 0.17) % 1,
    driftX: -50 - (i % 3) * 20,
    driftY: 80 + (i % 4) * 25,
  };
});

export const GoldenStardust: React.FC<GoldenStardustProps> = ({
  starCount = 20,
  grainCount = 26,
  speed = 1.0,
  opacity = 1.0,
  showSunbeam = true,
  zIndex = 15,
}) => {
  const frame = useCurrentFrame();

  // Nhịp thở vạt nắng xiên qua tán thông (Sunbeam Breathing)
  const beamPulse = Math.sin(frame * 0.04) * 0.25 + 0.75;

  const activeStars = STARS.slice(0, Math.min(starCount, STARS.length));
  const activeGrains = GRAINS.slice(0, Math.min(grainCount, GRAINS.length));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex,
      }}
    >
      {/* Vạt nắng vàng ấm xiên qua tán thông (Dreamy Golden Sunbeam) */}
      {showSunbeam && (
        <div
          style={{
            position: "absolute",
            inset: -200,
            background:
              "linear-gradient(130deg, transparent 25%, rgba(255, 235, 175, 0.04) 38%, rgba(255, 245, 210, 0.12) 48%, rgba(255, 235, 175, 0.05) 58%, transparent 72%)",
            opacity: beamPulse * opacity,
            pointerEvents: "none",
            transform: `translate3d(${Math.sin(frame * 0.02) * 15}px, ${Math.cos(frame * 0.02) * 10}px, 0)`,
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Dải tiểu sao 4 cánh lấp lánh (Micro Star Glints) */}
      {activeStars.map((star) => {
        const effDuration = star.durationFrames / speed;
        const progress =
          ((frame + star.phase * effDuration) % effDuration) / effDuration;

        // Trôi chéo mượt mà
        const curX =
          (star.initialXPercent / 100) * 2560 + progress * star.driftX;
        const curY =
          (star.initialYPercent / 100) * 1440 + progress * star.driftY;

        // Chu kỳ nhấp nháy êm dịu (Twinkle)
        const twinkle = Math.sin(progress * Math.PI * 4);
        const starOpacity = interpolate(
          twinkle,
          [-1, 1],
          [0.1, 0.95]
        );
        const starScale = interpolate(twinkle, [-1, 1], [0.4, 1.25]);
        const starRot = progress * 360 * star.rotSpeed;

        return (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: star.size,
              height: star.size,
              transform: `translate3d(${curX}px, ${curY}px, 0) scale(${starScale}) rotate(${starRot}deg)`,
              opacity: starOpacity * opacity,
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          >
            {/* Tia dọc */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 2,
                height: "100%",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(to bottom, transparent, #FFFFFF 45%, #FFFFFF 55%, transparent)",
                borderRadius: 1,
                boxShadow: "0 0 6px 2px rgba(255, 225, 110, 0.9)",
              }}
            />
            {/* Tia ngang */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "100%",
                height: 2,
                transform: "translateY(-50%)",
                background:
                  "linear-gradient(to right, transparent, #FFFFFF 45%, #FFFFFF 55%, transparent)",
                borderRadius: 1,
                boxShadow: "0 0 6px 2px rgba(255, 225, 110, 0.9)",
              }}
            />
            {/* Tâm sao phát sáng */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: star.size * 0.35,
                height: star.size * 0.35,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "#FFFFFF",
                boxShadow:
                  "0 0 8px 3px rgba(255, 235, 140, 1), 0 0 14px 6px rgba(230, 180, 70, 0.6)",
              }}
            />
          </div>
        );
      })}

      {/* Dải hạt cát bụi vàng lấp lánh (Golden Dust Grains) */}
      {activeGrains.map((grain) => {
        const effDuration = grain.durationFrames / speed;
        const progress =
          ((frame + grain.phase * effDuration) % effDuration) / effDuration;

        const curX =
          (grain.initialXPercent / 100) * 2560 + progress * grain.driftX;
        const curY =
          (grain.initialYPercent / 100) * 1440 + progress * grain.driftY;

        const pulse = Math.sin(progress * Math.PI * 6);
        const grainOpacity = interpolate(pulse, [-1, 1], [0.2, 0.85]);

        return (
          <div
            key={grain.id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: grain.size,
              height: grain.size,
              borderRadius: "50%",
              backgroundColor: "#FFF2C2",
              boxShadow:
                "0 0 6px 2px rgba(255, 220, 100, 0.8), 0 0 10px 4px rgba(212, 165, 60, 0.4)",
              transform: `translate3d(${curX}px, ${curY}px, 0)`,
              opacity: grainOpacity * opacity,
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
};
