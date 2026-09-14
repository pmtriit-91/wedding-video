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

export const Scene08_GuestWelcome: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene08_guestWelcome;

  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const textSpring = spring({
    frame: frame - 12,
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 140px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="bottom-left" opacity={0.4} />

      {/* Lời chào mừng bên trái */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 680,
          transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 54,
            color: weddingConfig.colors.goldPrimary,
            marginBottom: 16,
          }}
        >
          Welcome to Our Guests
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 48,
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
            marginTop: 30,
            width: 100,
            height: 2,
            backgroundColor: weddingConfig.colors.goldPrimary,
          }}
        />
      </div>

      {/* 3 Khung ảnh Ngoại cảnh đồi thông bên phải */}
      <div
        style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
        }}
      >
        {cfg.photos.map((photoSrc, idx) => {
          const photoSpring = spring({
            frame: frame - 16 - idx * 10,
            fps,
            config: { damping: 15, mass: 0.9 },
          });
          const photoY = interpolate(photoSpring, [0, 1], [40, 0]);
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
                width={460}
                height={760}
                variant="studio"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
