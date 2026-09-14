import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FloralDecor } from "../components/FloralDecor";
import { PhotoFrame } from "../components/PhotoFrame";
import { weddingConfig } from "../config/weddingConfig";

export const Scene01_Welcome: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene01_welcome;

  // Hiệu ứng Fade in / out toàn cảnh
  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Hiệu ứng xuất hiện tiêu đề chữ
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 100px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.4} />
      <FloralDecor position="top-right" opacity={0.4} />

      {/* 3 Khung ảnh Studio chính giữa */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          marginTop: 40,
          flex: 1,
        }}
      >
        {cfg.photos.map((photoSrc, idx) => {
          const photoSpring = spring({
            frame: frame - 15 - idx * 12,
            fps,
            config: { damping: 16, mass: 0.9 },
          });
          const photoY = interpolate(photoSpring, [0, 1], [60, 0]);
          const photoScale = interpolate(photoSpring, [0, 1], [0.92, 1]);
          const photoOpacity = interpolate(photoSpring, [0, 1], [0, 1]);

          const isCenter = idx === 1;

          return (
            <div
              key={idx}
              style={{
                transform: `translateY(${photoY}px) scale(${photoScale})`,
                opacity: photoOpacity,
                zIndex: isCenter ? 2 : 1,
              }}
            >
              <PhotoFrame
                src={photoSrc}
                durationInFrames={durationInFrames}
                direction={idx === 0 ? "pan-right" : idx === 1 ? "zoom-in" : "pan-left"}
                width={isCenter ? 520 : 440}
                height={isCenter ? 720 : 640}
                variant="studio"
              />
            </div>
          );
        })}
      </div>

      {/* Cụm Tiêu đề Chữ sang trọng bên dưới */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: weddingConfig.colors.textDark,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(180, 140, 80, 0.15)",
          }}
        >
          {cfg.title}
        </h1>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: weddingConfig.colors.goldPrimary,
            margin: "12px 0 16px 0",
          }}
        >
          {weddingConfig.weddingDate}
        </div>

        {/* Thanh trang trí gạch ngang tinh tế */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 120,
              height: 1.5,
              background: "linear-gradient(to right, transparent, #C69B56)",
            }}
          />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.35em",
              color: weddingConfig.colors.textMuted,
              textTransform: "uppercase",
            }}
          >
            {cfg.subtitle}
          </span>
          <div
            style={{
              width: 120,
              height: 1.5,
              background: "linear-gradient(to left, transparent, #C69B56)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
