import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FallingPetals } from "../components/FallingPetals";
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

  // Hiệu ứng loáng sáng cho ngày tháng (quét lan tỏa nối tiếp ngay sau tên dâu rể)
  // Quét lần 1: frame 142 -> 192
  // Quét lần 2: frame 252 -> 302
  let dateShimmerProgress = -1;
  if (frame >= 142 && frame <= 192) {
    dateShimmerProgress = interpolate(frame, [142, 192], [0, 1]);
  } else if (frame >= 252 && frame <= 302) {
    dateShimmerProgress = interpolate(frame, [252, 302], [0, 1]);
  }

  const dateShineX = interpolate(dateShimmerProgress, [0, 1], [130, -30]);
  const dateShineOpacity =
    dateShimmerProgress >= 0
      ? interpolate(dateShimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
      : 0;

  // Điểm lóe sáng kim cương (Diamond Glint) khi luồng sáng quét qua giữa dãy số ngày cưới
  const dateGlintOpacity =
    dateShimmerProgress >= 0.35 && dateShimmerProgress <= 0.65
      ? interpolate(dateShimmerProgress, [0.35, 0.5, 0.65], [0, 1, 0])
      : 0;
  const dateGlintScale = interpolate(dateGlintOpacity, [0, 1], [0.3, 1.2]);

  // Ngôi sao 2 bên nhấp nháy êm ái
  const starPulse = Math.sin(frame * 0.08) * 0.25 + 0.75;

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
        padding: "50px 80px",
        zIndex: 20,
      }}
    >
      <FloralDecor position="top-left" opacity={0.4} />
      <FloralDecor position="top-right" opacity={0.4} />

      {/* Hiệu ứng sao băng kim tuyến lướt qua từ frame 110 (~1.8s) rất thơ mộng */}
      <SparkleTrailArc startFrame={110} duration={100} />

      {/* Hiệu ứng cánh hoa mẫu đơn nhung đỏ chao lượn điện ảnh (Depth of Field) */}
      <FallingPetals count={6} speed={0.9} zIndex={25} />

      {/* 3 Khung ảnh Studio chính giữa - Xuất hiện lần lượt từ trái sang phải rất chậm rãi, quý phái */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 46,
          marginTop: 10,
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
                width={isCenter ? 720 : 600}
                height={isCenter ? 980 : 865}
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

        {/* Khối Ngày cưới Hoàng gia với hiệu ứng loáng sáng vàng kim & ánh sao kim cương */}
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            margin: "10px 0 16px 0",
          }}
        >
          {/* Ngôi sao lấp lánh bên trái */}
          <span
            style={{
              fontSize: 16,
              color: "#D4AF37",
              opacity: starPulse * 0.85,
              filter: "drop-shadow(0 0 6px rgba(212, 175, 55, 0.7))",
              userSelect: "none",
            }}
          >
            ✦
          </span>

          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Dòng chữ ngày tháng cơ bản - Tone vàng ánh kim sang trọng */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "0.26em",
                color: "#B48C50",
                textShadow: "0 1px 8px rgba(180, 140, 80, 0.25)",
              }}
            >
              {weddingConfig.weddingDate}
            </div>

            {/* Lớp loáng sáng vàng rực quét qua chữ số */}
            {dateShimmerProgress >= 0 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  background:
                    "linear-gradient(110deg, transparent 20%, rgba(245, 215, 145, 0.75) 42%, rgba(255, 255, 255, 1) 50%, rgba(245, 215, 145, 0.75) 58%, transparent 80%)",
                  backgroundSize: "220% 100%",
                  backgroundPosition: `${dateShineX}% 0`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  pointerEvents: "none",
                  opacity: dateShineOpacity,
                  willChange: "background-position, opacity",
                }}
              >
                {weddingConfig.weddingDate}
              </div>
            )}

            {/* Điểm chớp sáng kim cương (Diamond Sparkle Flare) lóe lên ở tâm khi ánh sáng quét qua */}
            {dateGlintOpacity > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) scale(${dateGlintScale})`,
                  opacity: dateGlintOpacity,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    background:
                      "radial-gradient(circle, #FFFFFF 20%, rgba(255, 225, 140, 0.8) 50%, transparent 80%)",
                    filter: "drop-shadow(0 0 8px rgba(255, 240, 180, 0.9))",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </div>

          {/* Ngôi sao lấp lánh bên phải */}
          <span
            style={{
              fontSize: 16,
              color: "#D4AF37",
              opacity: starPulse * 0.85,
              filter: "drop-shadow(0 0 6px rgba(212, 175, 55, 0.7))",
              userSelect: "none",
            }}
          >
            ✦
          </span>
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
