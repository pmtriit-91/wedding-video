import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export interface FallingPetalsProps {
  count?: number;
  speed?: number; // Hệ số tốc độ (mặc định 1.0 = chuyển động slow-motion điện ảnh)
  opacity?: number;
  zIndex?: number;
}

interface PetalSpec {
  id: number;
  image: "petal1.png" | "petal2.png";
  startXPercent: number; // Vị trí X theo % màn hình (2560px)
  durationFrames: number; // Thời gian rơi từ đỉnh tới đáy
  phaseOffset: number; // Pha lệch thời gian để hoa rải đều khắp khung hình
  size: number; // Kích thước (px)
  isForeground: boolean; // Tiền cảnh (nét, lớn) hay Hậu cảnh (nhỏ, mờ bokeh)
  swayAmp: number; // Biên độ lắc lư ngang (px)
  swayFreq: number; // Tần số lắc lư
  baseAngle: number; // Góc xoay cơ bản
  flipSpeed: number; // Tốc độ lật 3D
}

// Cấu hình tĩnh định sẵn 8 cánh hoa với quỹ đạo và chuyển động tự nhiên, không tính toán lại
const PETAL_SPECS: PetalSpec[] = [
  {
    id: 1,
    image: "petal1.png",
    startXPercent: 8,
    durationFrames: 310,
    phaseOffset: 0.1,
    size: 50,
    isForeground: false,
    swayAmp: 55,
    swayFreq: 1.7,
    baseAngle: -25,
    flipSpeed: 1.4,
  },
  {
    id: 2,
    image: "petal2.png",
    startXPercent: 26,
    durationFrames: 260,
    phaseOffset: 0.45,
    size: 76,
    isForeground: true,
    swayAmp: 75,
    swayFreq: 2.1,
    baseAngle: 30,
    flipSpeed: 1.8,
  },
  {
    id: 3,
    image: "petal1.png",
    startXPercent: 37, // Khe giữa ảnh trái và ảnh giữa
    durationFrames: 330,
    phaseOffset: 0.8,
    size: 42,
    isForeground: false,
    swayAmp: 45,
    swayFreq: 1.6,
    baseAngle: 15,
    flipSpeed: 1.2,
  },
  {
    id: 4,
    image: "petal2.png",
    startXPercent: 64, // Khe giữa ảnh giữa và ảnh phải
    durationFrames: 270,
    phaseOffset: 0.25,
    size: 82,
    isForeground: true,
    swayAmp: 70,
    swayFreq: 2.0,
    baseAngle: -35,
    flipSpeed: 1.9,
  },
  {
    id: 5,
    image: "petal1.png",
    startXPercent: 91,
    durationFrames: 320,
    phaseOffset: 0.65,
    size: 52,
    isForeground: false,
    swayAmp: 60,
    swayFreq: 1.7,
    baseAngle: 40,
    flipSpeed: 1.5,
  },
  {
    id: 6,
    image: "petal2.png",
    startXPercent: 18,
    durationFrames: 280,
    phaseOffset: 0.9,
    size: 68,
    isForeground: true,
    swayAmp: 65,
    swayFreq: 2.2,
    baseAngle: -15,
    flipSpeed: 2.0,
  },
  {
    id: 7,
    image: "petal1.png",
    startXPercent: 76,
    durationFrames: 290,
    phaseOffset: 0.05,
    size: 72,
    isForeground: true,
    swayAmp: 75,
    swayFreq: 1.9,
    baseAngle: 25,
    flipSpeed: 1.6,
  },
  {
    id: 8,
    image: "petal2.png",
    startXPercent: 84,
    durationFrames: 340,
    phaseOffset: 0.35,
    size: 46,
    isForeground: false,
    swayAmp: 50,
    swayFreq: 1.5,
    baseAngle: -20,
    flipSpeed: 1.3,
  },
];

export const FallingPetals: React.FC<FallingPetalsProps> = ({
  count = 6,
  speed = 1.0,
  opacity = 1.0,
  zIndex = 22,
}) => {
  const frame = useCurrentFrame();
  const petals = PETAL_SPECS.slice(0, Math.min(count, PETAL_SPECS.length));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex,
        perspective: 1000,
      }}
    >
      {petals.map((petal) => {
        // Chu kỳ rơi lặp lại mượt mà không ngắt quãng
        const effectiveDuration = petal.durationFrames / speed;
        const totalProgress =
          ((frame + petal.phaseOffset * effectiveDuration) %
            effectiveDuration) /
          effectiveDuration;

        // Tọa độ Y: Rơi từ trên đỉnh (-80px) xuống đáy màn hình 1440px (+100px)
        const y = interpolate(totalProgress, [0, 1], [-80, 1520]);

        // Độ mờ: Fade-in êm ái khi vừa xuất hiện ở đỉnh và fade-out khi chạm đáy
        const edgeOpacity = interpolate(
          totalProgress,
          [0, 0.08, 0.88, 1],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Chuyển động chao lượn ngang (horizontal sway) mô phỏng lực cản không khí
        const swayCycle = totalProgress * Math.PI * 2 * petal.swayFreq;
        const swayX = Math.sin(swayCycle) * petal.swayAmp;

        // Tọa độ X gốc tính theo pixel màn hình 2560px
        const basePixelX = (petal.startXPercent / 100) * 2560;
        const finalX = basePixelX + swayX;

        // Lật 3D đa trục tự nhiên (tumbling in 3D space)
        const rotX = Math.sin(swayCycle * 1.3) * 32;
        const rotY = Math.cos(swayCycle * petal.flipSpeed) * 38;
        const rotZ = petal.baseAngle + Math.sin(swayCycle * 0.8) * 22;

        return (
          <div
            key={petal.id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: petal.size,
              height: "auto",
              transform: `translate3d(${finalX}px, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              opacity: edgeOpacity * opacity * (petal.isForeground ? 0.95 : 0.75),
              filter: petal.isForeground
                ? "drop-shadow(0 8px 14px rgba(45, 8, 12, 0.38))"
                : "blur(1.2px) drop-shadow(0 4px 8px rgba(45, 8, 12, 0.22))",
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          >
            <Img
              src={staticFile(`decor/${petal.image}`)}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
