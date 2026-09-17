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

  // Hiệu ứng loáng sáng ánh kim vàng nhẹ nhàng quét qua chữ nội dung
  let shimmerProgress = -1;
  if (frame >= 60 && frame <= 120) {
    shimmerProgress = interpolate(frame, [60, 120], [0, 1]);
  } else if (frame >= 240 && frame <= 300) {
    shimmerProgress = interpolate(frame, [240, 300], [0, 1]);
  } else if (frame >= 380 && frame <= 440) {
    shimmerProgress = interpolate(frame, [380, 440], [0, 1]);
  }
  const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
  const shineOpacity =
    shimmerProgress >= 0
      ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
      : 0;

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
              "linear-gradient(to right, rgba(247, 243, 235, 0.32) 0%, rgba(247, 243, 235, 0.52) 40%, rgba(247, 243, 235, 0.86) 75%, #F7F3EB 100%)",
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
        {/* Tiêu đề Special Moments có lớp loáng sáng đồng bộ chuẩn Cảnh 10 */}
        <div style={{ position: "relative", marginBottom: 18 }}>
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 72,
              fontWeight: 600,
              color: "#A87932",
              letterSpacing: "0.02em",
              textShadow:
                "0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)",
            }}
          >
            Special Moments
          </div>

          {shimmerProgress >= 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Great Vibes', cursive",
                fontSize: 72,
                fontWeight: 600,
                letterSpacing: "0.02em",
                background:
                  "linear-gradient(110deg, transparent 20%, rgba(255, 235, 180, 0.7) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 180, 0.7) 60%, transparent 80%)",
                backgroundSize: "220% 100%",
                backgroundPosition: `${shineX}% 0`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
                opacity: shineOpacity,
                willChange: "background-position, opacity",
              }}
            >
              Special Moments
            </div>
          )}
        </div>

        {/* Trích dẫn nội dung theo font EB Garamond đồng bộ chuẩn Cảnh 10 */}
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.38,
              color: "#38302A",
              letterSpacing: "0.01em",
              margin: 0,
              textShadow:
                "0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)",
            }}
          >
            {cfg.quote}
          </p>

          {shimmerProgress >= 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.38,
                letterSpacing: "0.01em",
                margin: 0,
                background:
                  "linear-gradient(110deg, transparent 20%, rgba(255, 235, 180, 0.7) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 180, 0.7) 60%, transparent 80%)",
                backgroundSize: "220% 100%",
                backgroundPosition: `${shineX}% 0`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
                opacity: shineOpacity,
                willChange: "background-position, opacity",
              }}
            >
              {cfg.quote}
            </div>
          )}
        </div>

        {/* Thanh gạch dưới vàng tinh tế */}
        <div
          style={{
            marginTop: 32,
            width: 140,
            height: 2.5,
            backgroundColor: "#A87932",
            boxShadow: "0 0 12px rgba(168, 121, 50, 0.5)",
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
