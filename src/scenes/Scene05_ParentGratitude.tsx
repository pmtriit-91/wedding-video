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

export const Scene05_ParentGratitude: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene05_parentGratitude;

  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const photosSpring = spring({
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
        padding: "0 160px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.4} />
      <FloralDecor position="bottom-left" opacity={0.4} />

      {/* Cụm lời tri ân Bố Mẹ bên trái */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 820,
          transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 56,
            color: weddingConfig.colors.goldPrimary,
            marginBottom: 16,
          }}
        >
          Thank you Parents
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.4,
            color: weddingConfig.colors.textDark,
            marginBottom: 28,
            letterSpacing: "0.02em",
          }}
        >
          {cfg.title}
        </p>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.6,
            color: weddingConfig.colors.textMuted,
            letterSpacing: "0.02em",
          }}
        >
          {cfg.message}
        </p>

        <div
          style={{
            marginTop: 40,
            width: 100,
            height: 2,
            backgroundColor: weddingConfig.colors.goldPrimary,
          }}
        />
      </div>

      {/* Cụm ảnh bên phải: Sổ thề nguyện ở trên + 2 ảnh ngoại cảnh ở dưới */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          transform: `translateX(${interpolate(photosSpring, [0, 1], [40, 0])}px)`,
          opacity: interpolate(photosSpring, [0, 1], [0, 1]),
        }}
      >
        {/* Ảnh lớn cuốn sổ thề To my husband/wife */}
        <PhotoFrame
          src={cfg.vowBookPhoto}
          durationInFrames={durationInFrames}
          direction="zoom-in"
          width={860}
          height={560}
          variant="studio"
        />

        {/* 2 ảnh nhỏ ngoại cảnh bên dưới */}
        <div style={{ display: "flex", gap: 20 }}>
          {cfg.outdoorPhotos.map((photoSrc, idx) => (
            <PhotoFrame
              key={idx}
              src={photoSrc}
              durationInFrames={durationInFrames}
              direction={idx === 0 ? "pan-right" : "pan-left"}
              width={420}
              height={380}
              variant="studio"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
