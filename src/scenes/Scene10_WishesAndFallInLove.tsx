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
            padding: "0 180px",
          }}
        >
          <FloralDecor position="top-left" opacity={0.35} />

          {/* Lời chúc phúc bên trái */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 720,
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
              Blessings & Love
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 50,
                fontWeight: 600,
                lineHeight: 1.45,
                color: weddingConfig.colors.textDark,
                letterSpacing: "0.02em",
              }}
            >
              {cfg.wishesQuote}
            </p>
          </div>

          {/* 2 Khung ảnh Polaroid Chú rể & Cô dâu */}
          <div
            style={{
              display: "flex",
              gap: 50,
              alignItems: "center",
            }}
          >
            <PhotoFrame
              src={cfg.polaroidPhotos.groom.photo}
              durationInFrames={520}
              direction="zoom-in"
              width={460}
              height={580}
              variant="polaroid"
              captionName={cfg.polaroidPhotos.groom.name}
              captionTitle={cfg.polaroidPhotos.groom.title}
              style={{ transform: "rotate(-2.5deg)" }}
            />
            <PhotoFrame
              src={cfg.polaroidPhotos.bride.photo}
              durationInFrames={520}
              direction="zoom-in"
              width={460}
              height={580}
              variant="polaroid"
              captionName={cfg.polaroidPhotos.bride.name}
              captionTitle={cfg.polaroidPhotos.bride.title}
              style={{ transform: "rotate(2.5deg)" }}
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
