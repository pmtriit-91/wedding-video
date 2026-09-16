import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PhotoFrame } from "../components/PhotoFrame";
import { weddingConfig } from "../config/weddingConfig";

export const Scene04_GroomIntro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = weddingConfig.scenes.scene04_groomIntro;

  // 1. Độ mờ tổng thể chuyển cảnh vào/ra êm ái
  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 25, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );



  // 2. Chuyển động xuất hiện của đường trục dọc
  const lineSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 18, mass: 0.9 },
  });
  const lineScale = interpolate(lineSpring, [0, 1], [0, 1]);

  // 3. Chuyển động xuất hiện của cụm chữ bên phải
  const textSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 16, mass: 0.85 },
  });
  const textY = interpolate(textSpring, [0, 1], [25, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // 3.1 Hiệu ứng loáng sáng nhẹ nhàng quét qua tên MINH TRÍ
  let shimmerProgress = -1;
  if (frame >= 65 && frame <= 120) {
    shimmerProgress = interpolate(frame, [65, 120], [0, 1]);
  } else if (frame >= 240 && frame <= 295) {
    shimmerProgress = interpolate(frame, [240, 295], [0, 1]);
  }

  const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
  const shineOpacity =
    shimmerProgress >= 0
      ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
      : 0;

  // 4. Chuyển động xuất hiện của khung ảnh vòm chú rể (mượt mà, không giật pop)
  const photoOpacity = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // 5. Chuyển động sinh trưởng mọc từ gốc đến ngọn của các họa tiết cành lá
  // 5.1 Cành dọc chân trục (decor-vertical-stem): mọc từ đáy màn hình vươn lên ngọn
  const stemSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 18, mass: 1.1, stiffness: 60 },
  });
  const stemGrow = interpolate(stemSpring, [0, 1], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const stemOpacity = interpolate(stemSpring, [0, 0.15, 1], [0, 0.95, 0.95]);
  const stemScaleY = interpolate(stemSpring, [0, 1], [0.85, 1]);
  const stemTranslateY = interpolate(stemSpring, [0, 1], [35, 0]);

  // 5.2 Cành hoa lụa mép trái (decor-silk-leaves): mọc từ gốc trên-trái vươn rủ dần sang phải và xuống dưới
  const leavesSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, mass: 1.2, stiffness: 55 },
  });
  const leavesGrow = interpolate(leavesSpring, [0, 1], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const leavesOpacity = interpolate(leavesSpring, [0, 0.15, 1], [0, 0.95, 0.95]);
  const leavesScale = interpolate(leavesSpring, [0, 1], [0.82, 1]);
  const leavesRotate = interpolate(leavesSpring, [0, 1], [-5, 0]);

  // Tọa độ trục phân chia x đối xứng với cảnh 3 (1850px trên canvas 2560px)
  const LINE_X = 1850;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        zIndex: 20,
        overflow: "hidden",
      }}
    >
      {/* 1. Khung nền đệm mềm mại phía sau khung vòm (Soft Backdrop Accent) */}
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 70,
          width: 980,
          height: 1300,
          borderRadius: "490px 490px 36px 36px",
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(255, 252, 246, 0.85) 0%, rgba(247, 239, 227, 0.5) 65%, transparent 100%)",
          opacity: photoOpacity * 0.9,
          pointerEvents: "none",
          zIndex: 6,
        }}
      />

      {/* 2. Khung ảnh vòm Chú rể bề thế & lịch lãm bên trái (rộng 920x1220) */}
      <div
        style={{
          position: "absolute",
          left: 310,
          top: 110,
          opacity: photoOpacity,
          zIndex: 12,
        }}
      >
        <PhotoFrame
          src={cfg.photo}
          durationInFrames={durationInFrames}
          direction="zoom-in"
          width={920}
          height={1220}
          variant="arch"
          initialScale={1.0}
          finalScale={1.15}
          transformOrigin="50% 32%"
          imgStyle={{ objectPosition: "50% 10%" }}
        />
        {/* Chú rể: Không có ArchFrameShimmer (ít rườm rà, nam tính lịch thiệp theo yêu cầu) */}
      </div>

      {/* 3. Đường kẻ trục dọc thanh lịch (Editorial Vertical Divider) bên phải */}
      {/* 3.1 Đoạn trục trên: từ đỉnh màn hình xuống mép trên cụm chữ (y = 590px) */}
      <div
        style={{
          position: "absolute",
          left: LINE_X,
          top: 0,
          width: 2,
          height: 590,
          background:
            "linear-gradient(to bottom, rgba(44, 40, 37, 0.25) 0%, rgba(44, 40, 37, 0.9) 30%, #2C2825 100%)",
          transformOrigin: "top",
          transform: `scaleY(${lineScale})`,
          zIndex: 5,
        }}
      />

      {/* 3.2 Đoạn trục dưới: từ mép dưới tên MINH TRÍ (y = 815px) đâm thẳng xuống đáy xuyên qua hoa văn */}
      <div
        style={{
          position: "absolute",
          left: LINE_X,
          top: 815,
          bottom: 0,
          width: 2,
          background:
            "linear-gradient(to bottom, #2C2825 0%, rgba(44, 40, 37, 0.85) 75%, rgba(44, 40, 37, 0.3) 100%)",
          transformOrigin: "bottom",
          transform: `scaleY(${lineScale})`,
          zIndex: 5,
        }}
      />



      {/* 4. Cụm chữ Typography căn giữa hoàn hảo theo trục đường kẻ */}
      <div
        style={{
          position: "absolute",
          left: LINE_X,
          top: 700,
          transform: `translate(-50%, -50%) translateY(${textY}px)`,
          opacity: textOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: 900,
          zIndex: 10,
        }}
      >
        {/* Dòng 1: CON LÀ CHÚ RỂ (màu vàng #A87932 như Thank you Parents) */}
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "0.26em",
            color: "#A87932",
            marginBottom: 14,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textShadow:
              "0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)",
          }}
        >
          {cfg.roleText}
        </span>

        {/* Dòng 2: MINH TRÍ (Font EB Garamond sang trọng đồng điệu với Cẩm Hương) */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 94,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#181614",
              lineHeight: 1.1,
              textTransform: "uppercase",
              margin: 0,
              padding: "0 10px",
              whiteSpace: "nowrap",
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.05)",
            }}
          >
            {cfg.name}
          </h2>

          {/* Lớp loáng sáng nhẹ nhàng quét qua chữ MINH TRÍ */}
          {shimmerProgress >= 0 && (
            <h2
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'EB Garamond', serif",
                fontSize: 94,
                fontWeight: 700,
                letterSpacing: "0.06em",
                lineHeight: 1.1,
                textTransform: "uppercase",
                margin: 0,
                padding: "0 10px",
                whiteSpace: "nowrap",
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
              {cfg.name}
            </h2>
          )}
        </div>
      </div>

      {/* 5. Họa tiết cành lá thanh nhã chân đường kẻ dọc (decor-vertical-stem) - mọc từ gốc dưới lên ngọn */}
      <div
        style={{
          position: "absolute",
          left: LINE_X - 60,
          bottom: 0,
          opacity: stemOpacity,
          transform: `scaleY(${stemScaleY}) translateY(${stemTranslateY}px) scaleX(-1)`,
          transformOrigin: "bottom center",
          WebkitMaskImage:
            stemGrow < 100
              ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${stemGrow}%, rgba(0,0,0,0) ${Math.min(100, stemGrow + 12)}%)`
              : undefined,
          maskImage:
            stemGrow < 100
              ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${stemGrow}%, rgba(0,0,0,0) ${Math.min(100, stemGrow + 12)}%)`
              : undefined,
          zIndex: 8,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      >
        <Img
src={staticFile("decor/decor-vertical-stem.png")}
style={{
height: 660,
width: "auto",
filter: "drop-shadow(0 2px 8px rgba(140, 110, 70, 0.15))",
translate: "31.1px 3.5px"
}}
/>
      </div>

      {/* 6. Họa tiết cành lá lụa thanh mảnh vươn từ mép trái màn hình (decor-silk-leaves) - mọc từ gốc ra ngọn */}
      <div
        style={{
          position: "absolute",
          left: -25,
          top: "16%",
          opacity: leavesOpacity,
          transform: `scale(${leavesScale}) rotate(${leavesRotate}deg)`,
          transformOrigin: "top left",
          WebkitMaskImage:
            leavesGrow < 100
              ? `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${leavesGrow}%, rgba(0,0,0,0) ${Math.min(100, leavesGrow + 16)}%)`
              : undefined,
          maskImage:
            leavesGrow < 100
              ? `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${leavesGrow}%, rgba(0,0,0,0) ${Math.min(100, leavesGrow + 16)}%)`
              : undefined,
          zIndex: 8,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      >
        <Img
  src={staticFile("decor/decor-silk-leaves.png")}
  style={{
    height: 760,
    width: "auto",
    transform: "scaleX(-1)",
    transformOrigin: "center center",
    filter: "drop-shadow(0 2px 8px rgba(140, 110, 70, 0.15))",
    translate: "-22.4px -41.9px"
  }}
/>
      </div>
    </div>
  );
};
