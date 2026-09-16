import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
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
        padding: "0 160px",
        zIndex: 20,
      }}
    >
      {/* Lớp nền phong cảnh mùa hè phủ full màn hình bên trái với mép chuyển nhòe mượt mà */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 1450,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Img
          src={staticFile("decor/summer-encounter-wallpaper.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "left center",
            opacity: 0.72,
            filter: "brightness(102%) contrast(102%)",
          }}
        />

        {/* Lớp phủ chuyển tiếp lụa ấm áp để hòa quyện êm dịu với tone màu satin chung */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(247, 243, 235, 0.18) 0%, rgba(247, 243, 235, 0.35) 45%, rgba(247, 243, 235, 0.8) 75%, #F7F3EB 100%)",
          }}
        />
      </div>

      <FloralDecor position="top-left" opacity={0.3} />
      <FloralDecor position="bottom-left" opacity={0.25} />

      {/* Thông điệp bên trái nổi bật trên nền phong cảnh */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: 820,
          transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 60,
            color: weddingConfig.colors.goldPrimary,
            marginBottom: 18,
            textShadow: "0 2px 14px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.8)",
          }}
        >
          Special Moments
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.45,
            color: weddingConfig.colors.textDark,
            letterSpacing: "0.02em",
            margin: 0,
            textShadow:
              "0 2px 16px rgba(255, 255, 255, 0.95), 0 0 35px rgba(255, 255, 255, 0.9)",
          }}
        >
          {cfg.quote}
        </p>

        <div
          style={{
            marginTop: 35,
            width: 140,
            height: 2,
            backgroundColor: weddingConfig.colors.goldPrimary,
            boxShadow: "0 0 12px rgba(198, 155, 86, 0.5)",
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
          width={980}
          height={1200}
          variant="studio"
          initialScale={1.03}
          finalScale={1.12}
          transformOrigin="center 28%"
          imgStyle={{
            objectPosition: "center 22%",
          }}
        />
      </div>
    </div>
  );
};
