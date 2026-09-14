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

export const Scene12_Outro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene12_outro;

  // Fade in ở đầu, và fade out êm đềm ở cuối bài hát
  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 40, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const photoSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 220px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.45} scale={1.2} />
      <FloralDecor position="bottom-left" opacity={0.4} scale={1.1} />

      {/* Cụm lời cảm ơn kết thúc bên trái */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: 900,
          transform: `translateX(${interpolate(textSpring, [0, 1], [-50, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 70,
            color: weddingConfig.colors.goldPrimary,
            marginBottom: 16,
          }}
        >
          Thank you so much
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: weddingConfig.colors.textDark,
            lineHeight: 1.2,
            marginBottom: 30,
            textTransform: "uppercase",
          }}
        >
          {cfg.thankYouText}
        </h2>

        <div
          style={{
            width: 140,
            height: 2,
            background: "linear-gradient(to right, #C69B56, transparent)",
            marginBottom: 35,
          }}
        />

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: weddingConfig.colors.textDark,
            textTransform: "uppercase",
          }}
        >
          {weddingConfig.brideName} & {weddingConfig.groomName}
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: weddingConfig.colors.goldPrimary,
            marginTop: 10,
          }}
        >
          {weddingConfig.weddingDate}
        </div>
      </div>

      {/* Khung ảnh vòm rạng rỡ của đôi uyên ương bên phải */}
      <div
        style={{
          transform: `translateX(${interpolate(photoSpring, [0, 1], [50, 0])}px)`,
          opacity: interpolate(photoSpring, [0, 1], [0, 1]),
        }}
      >
        <PhotoFrame
          src={cfg.photo}
          durationInFrames={durationInFrames}
          direction="zoom-in"
          width={680}
          height={1000}
          variant="arch"
        />
      </div>
    </div>
  );
};
