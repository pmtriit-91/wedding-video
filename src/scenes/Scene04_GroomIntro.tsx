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

export const Scene04_GroomIntro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene04_groomIntro;

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
      <FloralDecor position="top-right" opacity={0.45} scale={1.2} />
      <FloralDecor position="bottom-right" opacity={0.35} scale={1.1} />

      {/* Khung ảnh vòm lịch lãm của Chú rể bên trái */}
      <div
        style={{
          transform: `translateX(${interpolate(photoSpring, [0, 1], [-50, 0])}px)`,
          opacity: interpolate(photoSpring, [0, 1], [0, 1]),
        }}
      >
        <PhotoFrame
          src={cfg.photo}
          durationInFrames={durationInFrames}
          direction="zoom-in"
          width={650}
          height={980}
          variant="arch"
        />
      </div>

      {/* Cụm chữ bên phải */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transform: `translateX(${interpolate(textSpring, [0, 1], [50, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          maxWidth: 800,
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: weddingConfig.colors.goldPrimary,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          {cfg.roleText}
        </span>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: weddingConfig.colors.textDark,
            lineHeight: 1.1,
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          {cfg.name}
        </h2>

        <div
          style={{
            width: 140,
            height: 2,
            background: "linear-gradient(to right, #C69B56, transparent)",
          }}
        />
      </div>
    </div>
  );
};
