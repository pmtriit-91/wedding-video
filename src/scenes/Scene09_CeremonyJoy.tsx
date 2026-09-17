import {
  Easing,
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

  // Hiệu ứng zoom-out điện ảnh nhẹ nhàng cho hình nền phụ phong cảnh mùa hè
  const bgScale = interpolate(frame, [0, durationInFrames], [1.15, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
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
      <FloralDecor position="top-left" opacity={0.3} />
      <FloralDecor position="bottom-left" opacity={0.25} />

      {/* Thông điệp bên trái: Editorial Statement trang trọng */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: 960,
          transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)`,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          zIndex: 5,
        }}
      >
        {/* Tiêu đề Special Moments có lớp loáng sáng đồng bộ chuẩn Cảnh 10 */}
        <div style={{ position: "relative", marginBottom: 22 }}>
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 84,
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
                fontSize: 84,
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

        {/* Trích dẫn nội dung theo font EB Garamond khổ lớn 72px ấn tượng */}
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.32,
              color: "#1A1614",
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
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.32,
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
            marginTop: 36,
            width: 180,
            height: 3,
            backgroundColor: "#A87932",
            boxShadow: "0 0 14px rgba(168, 121, 50, 0.5)",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Ảnh studio khổ lớn nổi bật bên phải chiếm ưu thế thị giác */}
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
          width={1120}
          height={1280}
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
