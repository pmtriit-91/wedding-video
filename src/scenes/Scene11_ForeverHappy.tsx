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

export const Scene11_ForeverHappy: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene11_foreverHappy;

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

  // Tiến trình chạy của Story Instagram (0 -> 1)
  const storyProgress = interpolate(frame, [0, durationInFrames], [0.2, 0.95], {
    extrapolateRight: "clamp",
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
      <FloralDecor position="top-left" opacity={0.35} />
      <FloralDecor position="top-right" opacity={0.35} />

      {/* 3 Khung Story mạng xã hội cách điệu */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          flex: 1,
        }}
      >
        {cfg.photos.map((photoSrc, idx) => {
          const photoSpring = spring({
            frame: frame - 15 - idx * 10,
            fps,
            config: { damping: 15, mass: 0.9 },
          });
          const photoY = interpolate(photoSpring, [0, 1], [50, 0]);
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
                direction={idx === 0 ? "zoom-in" : idx === 1 ? "pan-up" : "zoom-out"}
                width={480}
                height={840}
                variant="story"
                storyUsername={cfg.username}
                storyProgress={storyProgress}
              />
            </div>
          );
        })}
      </div>

      {/* Lời hứa tình yêu bên dưới */}
      <div
        style={{
          textAlign: "center",
          transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 50,
            fontWeight: 700,
            fontStyle: "italic",
            color: weddingConfig.colors.textDark,
            letterSpacing: "0.04em",
          }}
        >
          “{cfg.quote}”
        </p>
      </div>
    </div>
  );
};
