import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const Background: React.FC<{ overlayColor?: string }> = ({
  overlayColor = "rgba(253, 251, 247, 0.45)",
}) => {
  const frame = useCurrentFrame();

  // Chuyển động lướt chậm của nền lụa dùng translate3d
  const scale = interpolate(frame, [0, 3500, 7000], [1.02, 1.08, 1.03], {
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(frame, [0, 7000], [0, -35], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 7000], [0, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 2560,
        height: 1440,
        overflow: "hidden",
        backgroundColor: "#F7F3EB",
      }}
    >
      {/* Nền lụa satin chất lượng cao (bỏ filter nặng để tăng tốc GPU) */}
      <Img
        src={staticFile("background/satin-backdrop.jpg")}
        style={{
          position: "absolute",
          width: "105%",
          height: "105%",
          objectFit: "cover",
          transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
          willChange: "transform",
        }}
      />

      {/* Lớp phủ màu kem ấm & ánh sáng mềm mại (ĐÃ BỎ backdropFilter để hết vệt sọc/khối trắng giật lag) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: overlayColor,
        }}
      />

      {/* Radial soft glow tỏa ra từ trung tâm */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(255, 250, 240, 0.5) 0%, rgba(240, 230, 215, 0.2) 60%, rgba(210, 195, 175, 0.35) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle vignette mờ nhẹ 4 góc dùng GPU radial-gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(120, 95, 60, 0.14) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
