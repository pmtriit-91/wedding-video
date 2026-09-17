import React from "react";
import { KenBurnsDirection, KenBurnsImage } from "./KenBurnsImage";

interface PhotoFrameProps {
  src: string;
  durationInFrames: number;
  direction?: KenBurnsDirection;
  variant?: "studio" | "arch" | "polaroid" | "story";
  width: number;
  height: number;
  captionName?: string;
  captionTitle?: string;
  storyUsername?: string;
  storyProgress?: number; // 0 to 1
  style?: React.CSSProperties;
  startFrame?: number;
  initialScale?: number;
  finalScale?: number;
  transformOrigin?: string;
  zoomDuration?: number;
  holdDuration?: number;
  imgStyle?: React.CSSProperties;
  imageOffsetX?: number;
  imageOffsetY?: number;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  durationInFrames,
  direction = "zoom-in",
  variant = "studio",
  width,
  height,
  captionName,
  captionTitle,
  storyUsername = "camhuong_minhtri",
  storyProgress = 0.5,
  style,
  startFrame,
  initialScale,
  finalScale,
  transformOrigin,
  zoomDuration,
  holdDuration,
  imgStyle,
  imageOffsetX,
  imageOffsetY,
}) => {
  // 1. Dạng Khung Vòm (Arch Frame) cho Chân dung Cô dâu / Chú rể
  if (variant === "arch") {
    return (
      <div
        style={{
          width,
          height,
          position: "relative",
          borderRadius: `${width / 2}px ${width / 2}px 24px 24px`,
          padding: 8,
          background: "linear-gradient(145deg, #E6CA92 0%, #C69B56 50%, #8A6832 100%)",
          boxShadow: "0 30px 70px rgba(80, 55, 20, 0.22), 0 10px 25px rgba(0,0,0,0.08)",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          ...style,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: `${(width - 16) / 2}px ${(width - 16) / 2}px 18px 18px`,
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#FAF7F2",
          }}
        >
          <KenBurnsImage
            src={src}
            durationInFrames={durationInFrames}
            direction={direction}
            startFrame={startFrame}
            initialScale={initialScale}
            finalScale={finalScale}
            transformOrigin={transformOrigin}
            zoomDuration={zoomDuration}
            holdDuration={holdDuration}
            imgStyle={imgStyle}
            imageOffsetX={imageOffsetX}
            imageOffsetY={imageOffsetY}
          />
        </div>
      </div>
    );
  }

  // 2. Dạng Polaroid cổ điển sang trọng
  if (variant === "polaroid") {
    return (
      <div
        style={{
          width,
          height: height + 105,
          backgroundColor: "#FFFFFF",
          padding: "16px 16px 22px 16px",
          borderRadius: 8,
          boxShadow: "0 25px 55px rgba(60, 45, 20, 0.18), 0 4px 12px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(220, 205, 185, 0.5)",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          ...style,
        }}
      >
        <div
          style={{
            width: "100%",
            height,
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "#F5F0E6",
          }}
        >
          <KenBurnsImage
            src={src}
            durationInFrames={durationInFrames}
            direction={direction}
            startFrame={startFrame}
            initialScale={initialScale}
            finalScale={finalScale}
            transformOrigin={transformOrigin}
            zoomDuration={zoomDuration}
            holdDuration={holdDuration}
            imgStyle={imgStyle}
            imageOffsetX={imageOffsetX}
            imageOffsetY={imageOffsetY}
          />
        </div>

        {/* Tên & chức danh dưới khung Polaroid - Rõ nét, đậm đà sang trọng */}
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {captionName && (
            <span
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#0F0C0A",
                WebkitTextStroke: "0.4px #0F0C0A",
                textShadow: "0 1px 2px rgba(0,0,0,0.08)",
              }}
            >
              {captionName}
            </span>
          )}
          {captionTitle && (
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#9E6D24",
                textTransform: "uppercase",
              }}
            >
              {captionTitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Dạng Story Instagram hiện đại
  if (variant === "story") {
    return (
      <div
        style={{
          width,
          height,
          borderRadius: 32,
          overflow: "hidden",
          position: "relative",
          border: "4px solid rgba(255, 255, 255, 0.85)",
          boxShadow: "0 30px 70px rgba(50, 35, 15, 0.25), 0 8px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#1C1917",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          ...style,
        }}
      >
        <KenBurnsImage
          src={src}
          durationInFrames={durationInFrames}
          direction={direction}
          startFrame={startFrame}
          initialScale={initialScale}
          finalScale={finalScale}
          transformOrigin={transformOrigin}
          zoomDuration={zoomDuration}
          holdDuration={holdDuration}
          imgStyle={imgStyle}
          imageOffsetX={imageOffsetX}
          imageOffsetY={imageOffsetY}
        />

        {/* Lớp gradient trên & dưới của Story */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Thanh Progress bar ở trên */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            right: 14,
            height: 3,
            display: "flex",
            gap: 6,
            zIndex: 10,
          }}
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: idx === 0 ? "100%" : idx === 1 ? `${storyProgress * 100}%` : "0%",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header Story: Avatar + Username */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)",
              padding: 2,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#2E241E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              ❤
            </div>
          </div>
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {storyUsername}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontFamily: "sans-serif",
            }}
          >
            • 2h
          </span>
        </div>

        {/* Footer Story: Tim & Gửi tin nhắn */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 38,
              borderRadius: 20,
              border: "1.5px solid rgba(255,255,255,0.6)",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 14,
              color: "rgba(255,255,255,0.85)",
              fontSize: 13,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Gửi tin nhắn...
          </div>
          <div style={{ display: "flex", gap: 14, marginLeft: 14, color: "#FF3366", fontSize: 24 }}>
            ♥
          </div>
        </div>
      </div>
    );
  }

  // 4. Mặc định: Dạng Studio sang trọng (Gold border + shadow)
  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 16,
        padding: 6,
        background: "linear-gradient(135deg, rgba(235, 205, 150, 0.8) 0%, rgba(198, 155, 86, 0.4) 50%, rgba(255, 255, 255, 0.9) 100%)",
        boxShadow: "0 25px 60px rgba(60, 45, 20, 0.2), 0 6px 18px rgba(0,0,0,0.06)",
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#F7F3EB",
        }}
      >
        <KenBurnsImage
          src={src}
          durationInFrames={durationInFrames}
          direction={direction}
          startFrame={startFrame}
          initialScale={initialScale}
          finalScale={finalScale}
          transformOrigin={transformOrigin}
          zoomDuration={zoomDuration}
          holdDuration={holdDuration}
          imgStyle={imgStyle}
          imageOffsetX={imageOffsetX}
          imageOffsetY={imageOffsetY}
        />
      </div>
    </div>
  );
};
