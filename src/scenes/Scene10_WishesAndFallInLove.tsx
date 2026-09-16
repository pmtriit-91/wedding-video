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

export const Scene10_WishesAndFallInLove: React.FC<{
  durationInFrames: number;
}> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene10_wishesAndFallInLove;

  // Tổng thể cảnh: Fade in ban đầu và Fade out cuối cùng
  const overallOpacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Giai đoạn 1 (Frames 0 -> 520): Lời chúc phúc & 2 ảnh Polaroid Dâu Rể
  const phase1Opacity = interpolate(frame, [0, 20, 490, 520], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

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
  } else if (frame >= 220 && frame <= 280) {
    shimmerProgress = interpolate(frame, [220, 280], [0, 1]);
  } else if (frame >= 380 && frame <= 440) {
    shimmerProgress = interpolate(frame, [380, 440], [0, 1]);
  }
  const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
  const shineOpacity =
    shimmerProgress >= 0
      ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
      : 0;

  // Giai đoạn 2 (Frames 510 -> 1020): Tri ân khách phương xa & Ảnh chạm trán tình cảm
  const phase2Opacity = interpolate(
    frame,
    [510, 535, 990, 1020],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Giai đoạn 3 (Frames 1010 -> Kết thúc): FALL IN LOVE & 2 ảnh nhí nhảnh
  const phase3Opacity = interpolate(
    frame,
    [1010, 1035, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: overallOpacity,
        zIndex: 20,
      }}
    >
      {/* ========================================================
          GIAI ĐOẠN 1: 2 ẢNH POLAROID & LỜI CHÚC PHÚC
      ======================================================== */}
      {phase1Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase1Opacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 130px 0 85px",
          }}
        >
          {/* Lớp nền phong cảnh hoa hồng leo phủ full màn hình bên trái với mép chuyển nhòe mượt mà */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 1400,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 1,
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Img
              src={staticFile("decor/pink-ukulele-wallpaper.jpeg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "-180px center",
                opacity: 0.72,
                filter: "brightness(103%) contrast(102%)",
              }}
            />

            {/* Lớp phủ chuyển tiếp lụa ấm áp để hòa quyện êm dịu với tone màu satin chung */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(247, 243, 235, 0.35) 0%, rgba(247, 243, 235, 0.55) 40%, rgba(247, 243, 235, 0.88) 75%, #F7F3EB 100%)",
              }}
            />
          </div>

          <FloralDecor position="top-left" opacity={0.35} />

          {/* Lời chúc phúc bên trái */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              maxWidth: 620,
              transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)`,
              opacity: interpolate(textSpring, [0, 1], [0, 1]),
              zIndex: 5,
            }}
          >
            {/* Tiêu đề Blessings & Love có lớp loáng sáng */}
            <div style={{ position: "relative", marginBottom: 18 }}>
              <div
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 66,
                  fontWeight: 600,
                  color: "#A87932",
                  textShadow:
                    "0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)",
                }}
              >
                Blessings & Love
              </div>

              {shimmerProgress >= 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 66,
                    fontWeight: 600,
                    background:
                      "linear-gradient(110deg, transparent 20%, rgba(255, 245, 200, 0.85) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 245, 200, 0.85) 60%, transparent 80%)",
                    backgroundSize: "220% 100%",
                    backgroundPosition: `${shineX}% 0`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    pointerEvents: "none",
                    opacity: shineOpacity,
                    willChange: "background-position, opacity",
                  }}
                >
                  Blessings & Love
                </div>
              )}
            </div>

            {/* Trích dẫn nội dung có lớp loáng sáng quét qua */}
            <div style={{ position: "relative" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 52,
                  fontWeight: 700,
                  lineHeight: 1.48,
                  color: "#161311",
                  letterSpacing: "0.015em",
                  margin: 0,
                  textShadow:
                    "0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)",
                }}
              >
                {cfg.wishesQuote}
              </p>

              {shimmerProgress >= 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 52,
                    fontWeight: 700,
                    lineHeight: 1.48,
                    letterSpacing: "0.015em",
                    margin: 0,
                    background:
                      "linear-gradient(110deg, transparent 20%, rgba(255, 245, 200, 0.85) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 245, 200, 0.85) 60%, transparent 80%)",
                    backgroundSize: "220% 100%",
                    backgroundPosition: `${shineX}% 0`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    pointerEvents: "none",
                    opacity: shineOpacity,
                    willChange: "background-position, opacity",
                  }}
                >
                  {cfg.wishesQuote}
                </div>
              )}
            </div>
          </div>

          {/* 2 Khung ảnh Polaroid Chú rể & Cô dâu */}
          <div
            style={{
              display: "flex",
              gap: 36,
              alignItems: "center",
              position: "relative",
              transform: `translateX(${interpolate(photoSpring, [0, 1], [40, 0])}px)`,
              opacity: interpolate(photoSpring, [0, 1], [0, 1]),
              zIndex: 5,
            }}
          >
            <PhotoFrame
              src={cfg.polaroidPhotos.groom.photo}
              durationInFrames={520}
              direction="zoom-in"
              width={585}
              height={755}
              variant="polaroid"
              captionName={cfg.polaroidPhotos.groom.name}
              captionTitle={cfg.polaroidPhotos.groom.title}
              style={{ transform: "rotate(-1.8deg)" }}
            />
            <PhotoFrame
              src={cfg.polaroidPhotos.bride.photo}
              durationInFrames={520}
              direction="zoom-in"
              width={585}
              height={755}
              variant="polaroid"
              captionName={cfg.polaroidPhotos.bride.name}
              captionTitle={cfg.polaroidPhotos.bride.title}
              style={{ transform: "rotate(1.8deg)" }}
            />
          </div>
        </div>
      )}

      {/* ========================================================
          GIAI ĐOẠN 2: TRI ÂN KHÁCH ĐƯỜNG XA & ẢNH CHẠM TRÁN
      ======================================================== */}
      {phase2Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase2Opacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 180px",
          }}
        >
          <FloralDecor position="bottom-left" opacity={0.35} />

          {/* Lời cảm ơn đường xa */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 820,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 60,
                fontWeight: 700,
                color: weddingConfig.colors.goldPrimary,
                letterSpacing: "0.1em",
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              CHÚNG CON XIN CẢM ƠN
            </span>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.6,
                color: weddingConfig.colors.textDark,
                letterSpacing: "0.02em",
              }}
            >
              tất cả mọi người đã sắp xếp công việc và thời gian không ngại vượt xa xôi để tới đây.
            </p>
          </div>

          {/* Ảnh studio chạm trán tình cảm */}
          <PhotoFrame
            src={cfg.foreheadPhoto}
            durationInFrames={510}
            direction="zoom-in"
            width={820}
            height={960}
            variant="studio"
          />
        </div>
      )}

      {/* ========================================================
          GIAI ĐOẠN 3: FALL IN LOVE & 2 ẢNH VÁY CƯỚI TƯƠI TẮN
      ======================================================== */}
      {phase3Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase3Opacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "50px 140px",
          }}
        >
          <FloralDecor position="top-right" opacity={0.4} />

          {/* Tiêu đề FALL IN LOVE nghệ thuật */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 140,
                height: 1.5,
                background: "linear-gradient(to right, transparent, #C69B56)",
              }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: weddingConfig.colors.textDark,
                textTransform: "uppercase",
              }}
            >
              FALL IN LOVE
            </span>
            <div
              style={{
                width: 140,
                height: 1.5,
                background: "linear-gradient(to left, transparent, #C69B56)",
              }}
            />
          </div>

          {/* 2 Khung ảnh cưới studio nhí nhảnh giơ hoa */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 50,
              flex: 1,
            }}
          >
            {cfg.fallInLovePhotos.map((photoSrc, idx) => (
              <PhotoFrame
                key={idx}
                src={photoSrc}
                durationInFrames={520}
                direction={idx === 0 ? "zoom-in" : "pan-up"}
                width={560}
                height={800}
                variant="studio"
              />
            ))}
          </div>

          {/* Lời tri ân ở dưới */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 30,
              fontWeight: 500,
              color: weddingConfig.colors.textMuted,
              letterSpacing: "0.06em",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {cfg.fallInLoveQuote}
          </p>
        </div>
      )}
    </div>
  );
};
