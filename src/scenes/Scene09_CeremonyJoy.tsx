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

export const Scene09_CeremonyJoy: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene09_ceremonyJoy;

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
    frame: frame - 14,
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
        padding: "0 200px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.4} />
      <FloralDecor position="bottom-left" opacity={0.35} />

      {/* Thông điệp bên trái */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 720,
          transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 56,
            color: weddingConfig.colors.goldPrimary,
            marginBottom: 18,
          }}
        >
          Special Moments
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 54,
            fontWeight: 600,
            lineHeight: 1.45,
            color: weddingConfig.colors.textDark,
            letterSpacing: "0.02em",
          }}
        >
          {cfg.quote}
        </p>

        <div
          style={{
            marginTop: 35,
            width: 120,
            height: 2,
            backgroundColor: weddingConfig.colors.goldPrimary,
          }}
        />
      </div>

      {/* Ảnh studio lớn tình cảm bên phải */}
      <div
        style={{
          transform: `translateX(${interpolate(photoSpring, [0, 1], [40, 0])}px)`,
          opacity: interpolate(photoSpring, [0, 1], [0, 1]),
        }}
      >
        <PhotoFrame
          src={cfg.photo}
          durationInFrames={durationInFrames}
          direction="zoom-in"
          width={840}
          height={980}
          variant="studio"
        />
      </div>
    </div>
  );
};
