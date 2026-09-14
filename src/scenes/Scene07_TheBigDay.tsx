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

export const Scene07_TheBigDay: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene07_theBigDay;

  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

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
        padding: "50px 100px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-right" opacity={0.4} />

      {/* Cụm thông điệp Ngày trọng đại ở góc trên bên trái */}
      <div
        style={{
          width: "100%",
          maxWidth: 2200,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transform: `translateX(${interpolate(textSpring, [0, 1], [-30, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 52,
            fontWeight: 700,
            color: weddingConfig.colors.textDark,
            letterSpacing: "0.04em",
          }}
        >
          {cfg.line1}
        </span>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 30,
            fontWeight: 400,
            color: weddingConfig.colors.textMuted,
            letterSpacing: "0.05em",
            marginTop: 6,
          }}
        >
          {cfg.line2}
        </span>
      </div>

      {/* Dải 4 Khung ảnh Studio hạnh phúc */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          width: "100%",
          flex: 1,
        }}
      >
        {cfg.photos.map((photoSrc, idx) => {
          const photoSpring = spring({
            frame: frame - 16 - idx * 8,
            fps,
            config: { damping: 15, mass: 0.9 },
          });
          const photoY = interpolate(photoSpring, [0, 1], [45, 0]);
          const photoOpacity = interpolate(photoSpring, [0, 1], [0, 1]);

          return (
            <div
              key={idx}
              style={{
                transform: `translateY(${photoY}px)`,
                opacity: photoOpacity,
              }}
            >
              <PhotoFrame
                src={photoSrc}
                durationInFrames={durationInFrames}
                direction={idx % 2 === 0 ? "zoom-in" : "pan-up"}
                width={520}
                height={780}
                variant="studio"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
