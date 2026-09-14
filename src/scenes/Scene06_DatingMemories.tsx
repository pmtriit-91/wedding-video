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

export const Scene06_DatingMemories: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene06_datingMemories;

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
        justifyContent: "center",
        padding: "40px 100px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.35} />
      <FloralDecor position="top-right" opacity={0.35} />

      {/* Dòng trích dẫn kỷ niệm ở trên */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 1600,
          marginBottom: 44,
          transform: `translateY(${interpolate(textSpring, [0, 1], [-25, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 46,
            fontWeight: 600,
            fontStyle: "italic",
            lineHeight: 1.4,
            color: weddingConfig.colors.textDark,
            letterSpacing: "0.03em",
          }}
        >
          “{cfg.quote}”
        </p>
      </div>

      {/* 3 Khung ảnh kỷ niệm hẹn hò */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 36,
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
                direction={idx === 0 ? "pan-right" : idx === 1 ? "zoom-in" : "pan-left"}
                width={520}
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
