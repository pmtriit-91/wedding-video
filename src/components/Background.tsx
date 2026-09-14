import React from "react";
import { Loop, OffthreadVideo, staticFile } from "remotion";

export const Background: React.FC<{ overlayColor?: string }> = ({
  overlayColor = "rgba(253, 251, 247, 0.45)",
}) => {
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
      {/* Nền lụa satin chuyển động sóng nếp gấp dào dạt (seamless 8s loop, 60fps) */}
      <Loop durationInFrames={480}>
        <OffthreadVideo
          src={staticFile("background/satin-waving.mp4")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Loop>

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
