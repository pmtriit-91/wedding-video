import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FloralDecor } from "../components/FloralDecor";
import { PhotoFrame } from "../components/PhotoFrame";
import { SparkleTrailArc } from "../components/SparkleTrailArc";
import { weddingConfig } from "../config/weddingConfig";

export const Scene01_Welcome: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene01_welcome;

  // Hiệu ứng Fade in / out toàn cảnh
  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Hiệu ứng xuất hiện tiêu đề chữ chậm rãi
  const titleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, mass: 1.0 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [25, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Hiệu ứng loáng sáng chữ sang trọng (Luxury Shimmer Sweep)
  // Quét lần 1: frame 130 -> 185 (khi cả 3 ảnh đã xuất hiện trọn vẹn)
  // Quét lần 2: frame 240 -> 295
  let shimmerProgress = -1;
  if (frame >= 130 && frame <= 185) {
    shimmerProgress = interpolate(frame, [130, 185], [0, 1]);
  } else if (frame >= 240 && frame <= 295) {
    shimmerProgress = interpolate(frame, [240, 295], [0, 1]);
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 100px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.4} />
      <FloralDecor position="top-right" opacity={0.4} />

      {/* Hiệu ứng sao băng kim tuyến lướt qua từ frame 110 (~1.8s) rất thơ mộng */}
      <SparkleTrailArc startFrame={110} duration={100} />

      {/* 3 Khung ảnh Studio chính giữa - Xuất hiện lần lượt từ trái sang phải rất chậm rãi, quý phái */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          marginTop: 15,
          flex: 1,
        }}
      >
        {cfg.photos.map((photoSrc, idx) => {
          // Xuất hiện lần lượt từ trái qua phải (idx 0: Trái, idx 1: Giữa, idx 2: Phải)
          // Mỗi ảnh cách nhau 36 frames (~0.60 giây), thời gian xuất hiện kéo dài tới 52 frames (~0.87 giây) cực kỳ êm dịu, không hề hối hả
          const photoStart = 16 + idx * 36;
          const photoProgress = interpolate(
            frame,
            [photoStart, photoStart + 52],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          // Opacity tăng dần nhẹ nhàng và sâu lắng từ 0 -> 100%
          const photoOpacity = interpolate(
            frame,
            [photoStart, photoStart + 52],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            }
          );

          // Trượt lên nhẹ nhàng 30px và scale êm từ 0.98 lên 1.0
          const photoY = interpolate(photoProgress, [0, 1], [30, 0]);
          const photoScale = interpolate(photoProgress, [0, 1], [0.98, 1]);

          const isCenter = idx === 1;

          return (
            <div
              key={idx}
              style={{
                transform: `translate3d(0, ${photoY}px, 0) scale(${photoScale})`,
                opacity: photoOpacity,
                zIndex: isCenter ? 2 : 1,
              }}
            >
              <PhotoFrame
                src={photoSrc}
                durationInFrames={durationInFrames}
                direction={idx === 0 ? "pan-right" : idx === 1 ? "zoom-in" : "pan-left"}
                width={isCenter ? 620 : 520}
                height={isCenter ? 860 : 760}
                variant="studio"
              />
            </div>
          );
        })}
      </div>

      {/* Cụm Tiêu đề Chữ sang trọng bên dưới */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translate3d(0, ${titleY}px, 0)`,
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        {/* Tên Cô dâu & Chú rể với hiệu ứng loáng sáng hoàng gia */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: weddingConfig.colors.textDark,
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(180, 140, 80, 0.15)",
              margin: 0,
            }}
          >
            {cfg.title}
          </h1>

          {/* Lớp loáng sáng ánh kim vàng hoàng gia quét qua mặt chữ */}
          {shimmerProgress >= 0 && (
            <h1
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                fontSize: 78,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: 0,
                background:
                  "linear-gradient(110deg, transparent 25%, rgba(245, 215, 145, 0.7) 42%, rgba(255, 255, 255, 1) 50%, rgba(245, 215, 145, 0.7) 58%, transparent 75%)",
                backgroundSize: "220% 100%",
                backgroundPosition: `${shineX}% 0`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
                opacity: shineOpacity,
                willChange: "background-position, opacity",
              }}
            >
              {cfg.title}
            </h1>
          )}
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: weddingConfig.colors.goldPrimary,
            margin: "12px 0 16px 0",
          }}
        >
          {weddingConfig.weddingDate}
        </div>

        {/* Thanh trang trí gạch ngang tinh tế */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 120,
              height: 1.5,
              background: "linear-gradient(to right, transparent, #C69B56)",
            }}
          />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.35em",
              color: weddingConfig.colors.textMuted,
              textTransform: "uppercase",
            }}
          >
            {cfg.subtitle}
          </span>
          <div
            style={{
              width: 120,
              height: 1.5,
              background: "linear-gradient(to left, transparent, #C69B56)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
