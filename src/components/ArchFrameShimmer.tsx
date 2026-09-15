import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export interface ArchFrameShimmerProps {
  width: number;
  height: number;
  triggerFrames?: number[];
  sweepDuration?: number; // Số frame cho mỗi lần quét
}

export const ArchFrameShimmer: React.FC<ArchFrameShimmerProps> = ({
  width,
  height,
  triggerFrames = [45, 210],
  sweepDuration = 60,
}) => {
  const frame = useCurrentFrame();

  // Xác định xem có đợt quét nào đang hoạt động tại frame hiện tại không
  let activeTrigger = -1;
  for (const trig of triggerFrames) {
    if (frame >= trig && frame <= trig + sweepDuration + 15) {
      activeTrigger = trig;
      break;
    }
  }

  if (activeTrigger === -1) {
    return null;
  }

  const elapsed = frame - activeTrigger;
  const rawProgress = Math.min(1, Math.max(0, elapsed / sweepDuration));

  // Easing mượt mà tự nhiên: nhanh ở đầu vòm, lướt êm dịu cạnh đứng, chậm lại khi chạm đáy
  const progress = interpolate(rawProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.35, 0.05, 0.25, 1),
  });

  // Hình học cung vòm:
  // Đường chạy nằm đúng trên tâm rãnh kim loại vàng (cách mép ngoài 4px)
  const pad = 4;
  const W = width - pad * 2;
  const H = height - pad * 2;
  const R = W / 2;

  const L1 = (Math.PI * R) / 2; // Cung vòm nửa trên
  const L2 = H - R;             // Cạnh đứng
  const L3 = W / 2;             // Nửa cạnh đáy vào giữa
  const Ltotal = L1 + L2 + L3;

  const s = progress * Ltotal;

  // Tính tọa độ vị trí đầu điểm sáng (x, y)
  const getCoords = (dist: number) => {
    const d = Math.max(0, Math.min(Ltotal, dist));
    let xl = R;
    let yl = 0;
    let xr = R;
    let yr = 0;

    if (d <= L1) {
      const ang = (d / L1) * (Math.PI / 2);
      xl = R - R * Math.sin(ang);
      yl = R - R * Math.cos(ang);
      xr = R + R * Math.sin(ang);
      yr = R - R * Math.cos(ang);
    } else if (d <= L1 + L2) {
      const d2 = d - L1;
      xl = 0;
      yl = R + d2;
      xr = W;
      yr = R + d2;
    } else {
      const d3 = d - (L1 + L2);
      xl = d3;
      yl = H;
      xr = W - d3;
      yr = H;
    }

    return {
      left: { x: xl + pad, y: yl + pad },
      right: { x: xr + pad, y: yr + pad },
    };
  };

  const head = getCoords(s);

  // Đuôi sáng (Tail) dài khoảng 220px phía sau điểm sáng
  const tailLength = 220;
  const tailProgress = Math.max(0, (s - tailLength) / Ltotal);

  // Độ mờ tổng thể của luồng sáng
  const flareOpacity = interpolate(
    elapsed,
    [0, 8, sweepDuration - 6, sweepDuration, sweepDuration + 14],
    [0, 1, 1, 0.8, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Hiệu ứng chớp sáng bùng nổ khi 2 điểm sáng gặp nhau tại đáy (Bottom Burst Flash)
  const isMeeting = rawProgress >= 0.95;
  const meetBurstScale = interpolate(
    elapsed,
    [sweepDuration - 4, sweepDuration + 3, sweepDuration + 14],
    [0.6, 1.8, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const meetBurstOpacity = interpolate(
    elapsed,
    [sweepDuration - 4, sweepDuration + 2, sweepDuration + 14],
    [0, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // SVG Path cho viền nửa trái và nửa phải
  const leftPathD = `M ${pad + R} ${pad} A ${R} ${R} 0 0 0 ${pad} ${pad + R} L ${pad} ${pad + H} L ${pad + R} ${pad + H}`;
  const rightPathD = `M ${pad + R} ${pad} A ${R} ${R} 0 0 1 ${pad + W} ${pad + R} L ${pad + W} ${pad + H} L ${pad + R} ${pad + H}`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 25,
        overflow: "visible",
      }}
    >
      {/* 1. Lớp vệt sáng lướt viền (Glowing Trail Stroke) */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
          filter: "drop-shadow(0 0 8px rgba(255, 220, 140, 0.8)) drop-shadow(0 0 18px rgba(230, 170, 70, 0.5))",
        }}
      >
        <defs>
          <linearGradient id="goldBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#FFF2D0" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#E5C175" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B38636" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Nửa trái */}
        <path
          d={leftPathD}
          fill="none"
          stroke="url(#goldBeam)"
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeDasharray={Ltotal}
          strokeDashoffset={Ltotal * (1 - progress)}
          style={{
            opacity: flareOpacity * 0.9,
          }}
        />

        {/* Nửa phải */}
        <path
          d={rightPathD}
          fill="none"
          stroke="url(#goldBeam)"
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeDasharray={Ltotal}
          strokeDashoffset={Ltotal * (1 - progress)}
          style={{
            opacity: flareOpacity * 0.9,
          }}
        />
      </svg>

      {/* 2. Điểm sáng dẫn đầu bên Trái (Left Flare Head) */}
      {rawProgress < 0.98 && (
        <div
          style={{
            position: "absolute",
            left: head.left.x,
            top: head.left.y,
            transform: "translate(-50%, -50%)",
            opacity: flareOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Quầng sáng tỏa (Outer Glow Halo) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 52,
              height: 52,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,235,175,0.7) 35%, rgba(220,170,75,0.3) 65%, transparent 100%)",
              filter: "blur(2px)",
            }}
          />
          {/* Hạt nhân trắng chói sáng (Core White Spark) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 10px #FFFFFF, 0 0 20px #FFE082, 0 0 35px #FFA000",
            }}
          />
          {/* Tia sao 4 cánh lấp lánh (Sparkle Star) */}
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${elapsed * 6}deg)`,
              overflow: "visible",
            }}
          >
            <path
              d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
              fill="#FFFFFF"
              opacity={0.9}
            />
          </svg>
        </div>
      )}

      {/* 3. Điểm sáng dẫn đầu bên Phải (Right Flare Head) */}
      {rawProgress < 0.98 && (
        <div
          style={{
            position: "absolute",
            left: head.right.x,
            top: head.right.y,
            transform: "translate(-50%, -50%)",
            opacity: flareOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Quầng sáng tỏa (Outer Glow Halo) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 52,
              height: 52,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,235,175,0.7) 35%, rgba(220,170,75,0.3) 65%, transparent 100%)",
              filter: "blur(2px)",
            }}
          />
          {/* Hạt nhân trắng chói sáng (Core White Spark) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 10px #FFFFFF, 0 0 20px #FFE082, 0 0 35px #FFA000",
            }}
          />
          {/* Tia sao 4 cánh lấp lánh (Sparkle Star) */}
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${-elapsed * 6}deg)`,
              overflow: "visible",
            }}
          >
            <path
              d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
              fill="#FFFFFF"
              opacity={0.9}
            />
          </svg>
        </div>
      )}

      {/* 4. Quầng sáng bùng nổ khi 2 điểm sáng gặp nhau tại điểm giữa cạnh dưới (Bottom Center Meet Burst) */}
      {isMeeting && (
        <div
          style={{
            position: "absolute",
            left: pad + R,
            top: pad + H,
            transform: `translate(-50%, -50%) scale(${meetBurstScale})`,
            opacity: meetBurstOpacity,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        >
          {/* Quầng sáng lớn */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,240,190,0.85) 30%, rgba(230,180,80,0.4) 65%, transparent 100%)",
              filter: "blur(4px)",
            }}
          />
          {/* Tâm chớp sáng */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 15px #FFFFFF, 0 0 30px #FFE082, 0 0 50px #FFB300",
            }}
          />
          {/* Ngôi sao lấp lánh lớn */}
          <svg
            width={54}
            height={54}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              overflow: "visible",
            }}
          >
            <path
              d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
              fill="#FFFFFF"
              filter="drop-shadow(0 0 6px #FFE082)"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
