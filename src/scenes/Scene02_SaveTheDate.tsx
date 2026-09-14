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

export const Scene02_SaveTheDate: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene02_saveTheDate;

  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const titleSpring = spring({
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
        justifyContent: "center",
        padding: "40px 100px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.35} />
      <FloralDecor position="bottom-right" opacity={0.35} />

      {/* Chữ số chìm nghệ thuật cỡ lớn (Watermark) */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 320,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "rgba(198, 155, 86, 0.08)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        {cfg.dateHighlight}
      </div>

      {/* Header: SAVE the DATE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 36,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.92, 1])})`,
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: weddingConfig.colors.textDark,
          }}
        >
          SAVE
        </span>
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 84,
            color: weddingConfig.colors.goldPrimary,
            margin: "0 10px",
            transform: "translateY(-6px)",
          }}
        >
          the
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: weddingConfig.colors.textDark,
          }}
        >
          DATE
        </span>
      </div>

      {/* 3 Khung ảnh Ngoại cảnh đồi thông */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          zIndex: 10,
        }}
      >
        {cfg.photos.map((photoSrc, idx) => {
          const photoSpring = spring({
            frame: frame - 18 - idx * 10,
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
                width={500}
                height={700}
                variant="studio"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
