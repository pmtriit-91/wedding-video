import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SparkleTrailArcProps {
  startFrame?: number;
  duration?: number;
}

// Hàm tính tọa độ đường cong Bezier bậc 3 (Cubic Bezier)
function getCubicBezier(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
  return { x, y };
}

// Thuật toán De Casteljau: Cắt đường cong Bezier chuẩn xác từ 0 đến t
// Triệt tiêu 100% hiện tượng bị uốn lượn/vòng thắt ngược khi mới xuất phát
function getSubdividedPath(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
) {
  if (t <= 0.002) {
    return `M ${p0.x} ${p0.y} L ${p0.x} ${p0.y}`;
  }

  // Điểm điều khiển 1 phân đoạn (Level 1)
  const q1x = (1 - t) * p0.x + t * p1.x;
  const q1y = (1 - t) * p0.y + t * p1.y;

  const mid1x = (1 - t) * p1.x + t * p2.x;
  const mid1y = (1 - t) * p1.y + t * p2.y;

  // Điểm điều khiển 2 phân đoạn (Level 2)
  const q2x = (1 - t) * q1x + t * mid1x;
  const q2y = (1 - t) * q1y + t * mid1y;

  // Điểm mút đầu sao băng (Level 3)
  const head = getCubicBezier(t, p0, p1, p2, p3);

  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} C ${q1x.toFixed(1)} ${q1y.toFixed(1)}, ${q2x.toFixed(1)} ${q2y.toFixed(1)}, ${head.x.toFixed(1)} ${head.y.toFixed(1)}`;
}

// 38 hạt bụi kim tuyến phát ra theo sau đầu sao băng (tạo sẵn 1 lần ở cấp module)
const PARTICLE_COUNT = 38;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const birthT = (i + 1) / (PARTICLE_COUNT + 1);
  const randOffsetAngle = (i * 137.5 * Math.PI) / 180;
  const randDist = 8 + (i % 5) * 6;
  const size = 4 + (i % 4) * 3.5;
  const isStar = i % 3 === 0;

  return {
    id: i,
    birthT,
    size,
    isStar,
    offsetX: Math.cos(randOffsetAngle) * randDist,
    offsetY: Math.sin(randOffsetAngle) * randDist,
  };
});

export const SparkleTrailArc: React.FC<SparkleTrailArcProps> = ({
  startFrame = 35,
  duration = 80, // ~1.3s lướt qua
}) => {
  const frame = useCurrentFrame();

  // Quỹ đạo ôm vòng cung dưới chân 3 bức ảnh chính giữa
  // Màn hình 2560 x 1440
  const p0 = { x: 160, y: 720 };
  const p1 = { x: 750, y: 1000 };
  const p2 = { x: 1810, y: 990 };
  const p3 = { x: 2400, y: 580 };

  // Tiến độ sao băng chạy từ 0 -> 1
  const rawProgress = (frame - startFrame) / duration;
  const progress = Math.max(0, Math.min(1, rawProgress));

  // Kiểm tra thời điểm hoạt động (cộng thêm 25 frames để bụi tàn dần)
  if (frame < startFrame - 5 || frame > startFrame + duration + 35) {
    return null;
  }

  // Tọa độ đầu sao băng hiện tại
  const headPos = getCubicBezier(progress, p0, p1, p2, p3);

  // Độ mờ và kích thước đầu sao băng
  const headOpacity = interpolate(
    progress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 35,
        overflow: "hidden",
      }}
    >
      {/* SVG dải sáng uốn lượn mờ dần theo vệt bay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 2560 1440"
      >
        <defs>
          <linearGradient id="arcGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C69B56" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5D79E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d={getSubdividedPath(progress, p0, p1, p2, p3)}
          fill="none"
          stroke="url(#arcGlowGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            opacity: headOpacity * 0.75,
          }}
        />
      </svg>

      {/* Các hạt bụi kim tuyến lấp lánh nở ra từ sau đuôi sao băng */}
      {PARTICLES.map((p) => {
        if (progress < p.birthT) return null;

        // Tuổi thọ của hạt sau khi sinh ra (0 -> 1)
        const age = (progress - p.birthT) / 0.35; // tồn tại trong khoảng 35% chặng đường
        if (age > 1) return null;

        const posAtBirth = getCubicBezier(p.birthT, p0, p1, p2, p3);
        const particleOpacity = Math.sin(age * Math.PI) * 0.85;
        const currentX = posAtBirth.x + p.offsetX + (age * 15);
        const currentY = posAtBirth.y + p.offsetY + Math.pow(age, 1.8) * 45; // trọng lực rơi nhẹ
        const scale = (1 - age * 0.4) * (Math.sin(frame * 0.4 + p.id) * 0.3 + 0.9);

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`,
              opacity: particleOpacity,
              willChange: "transform, opacity",
            }}
          >
            {p.isStar ? (
              // Ngôi sao 4 cánh lấp lánh (Sparkle Star)
              <svg
                width={p.size * 3}
                height={p.size * 3}
                viewBox="0 0 24 24"
                style={{
                  transform: `translate(-50%, -50%) rotate(${frame * 4 + p.id * 30}deg)`,
                }}
              >
                <path
                  d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z"
                  fill="rgba(255, 248, 220, 0.95)"
                />
              </svg>
            ) : (
              // Đốm kim tuyến tròn phát quang
              <div
                style={{
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #FFFFFF 0%, #F6DA9C 60%, rgba(212,175,55,0) 100%)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Đầu sao băng phát sáng rực rỡ (Head Comet Flare) */}
      {progress > 0 && progress < 1 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate3d(${headPos.x}px, ${headPos.y}px, 0)`,
            opacity: headOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Vầng hào quang tròn */}
          <div
            style={{
              position: "absolute",
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(245, 215, 140, 0.6) 40%, rgba(198, 155, 86, 0) 75%)",
            }}
          />

          {/* Ngôi sao 4 cánh chính sáng chói xoay tròn */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) rotate(${frame * 5}deg)`,
            }}
          >
            <path
              d="M32 0 Q32 32 0 32 Q32 32 32 64 Q32 32 64 32 Q32 32 32 0 Z"
              fill="rgba(255, 255, 255, 0.98)"
            />
          </svg>

          {/* Ngôi sao chéo phụ nhỏ hơn */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) rotate(${frame * 5 + 45}deg)`,
            }}
          >
            <path
              d="M32 6 Q32 32 6 32 Q32 32 32 58 Q32 32 58 32 Q32 32 32 6 Z"
              fill="rgba(247, 225, 160, 0.85)"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
