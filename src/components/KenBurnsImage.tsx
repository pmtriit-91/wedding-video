import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export type KenBurnsDirection =
  | "zoom-in"
  | "zoom-out"
  | "pan-right"
  | "pan-left"
  | "pan-up"
  | "zoom-out-reveal";

export interface KenBurnsImageProps {
  src: string;
  durationInFrames: number;
  direction?: KenBurnsDirection;
  startFrame?: number;
  initialScale?: number;
  finalScale?: number;
  transformOrigin?: string;
  zoomDuration?: number;
  holdDuration?: number;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  durationInFrames,
  direction = "zoom-in",
  startFrame = 0,
  initialScale,
  finalScale,
  transformOrigin,
  zoomDuration,
  holdDuration = 28,
  style,
  imgStyle,
}) => {
  const frame = useCurrentFrame();

  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;

  if (direction === "zoom-out-reveal") {
    const sFrame = startFrame;
    const hold = holdDuration;
    const zStart = sFrame + hold;
    const zDuration = zoomDuration ?? Math.max(60, durationInFrames - zStart - 25);
    
    let progress = 0;
    if (frame < zStart) {
      progress = 0;
    } else {
      progress = interpolate(
        frame,
        [zStart, zStart + zDuration],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.quad),
        }
      );
    }

    scale = interpolate(
      progress,
      [0, 1],
      [initialScale ?? 1.55, finalScale ?? 1.3]
    );
  } else if (direction === "zoom-in") {
    const startS = initialScale ?? 1.0;
    const endS = finalScale ?? 1.15;
    scale = interpolate(
      frame,
      [startFrame, durationInFrames],
      [startS, endS],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      }
    );
  } else if (direction === "zoom-out") {
    const startS = initialScale ?? 1.15;
    const endS = finalScale ?? 1.0;
    scale = interpolate(
      frame,
      [startFrame, durationInFrames],
      [startS, endS],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      }
    );
  } else if (direction === "pan-right") {
    scale = 1.05;
    translateX = interpolate(frame, [0, durationInFrames], [-20, 20], {
      extrapolateRight: "clamp",
    });
  } else if (direction === "pan-left") {
    scale = 1.05;
    translateX = interpolate(frame, [0, durationInFrames], [20, -20], {
      extrapolateRight: "clamp",
    });
  } else if (direction === "pan-up") {
    scale = 1.05;
    translateY = interpolate(frame, [0, durationInFrames], [20, -20], {
      extrapolateRight: "clamp",
    });
  }

  const resolvedSrc = src.startsWith("http")
    ? src
    : staticFile(src.startsWith("/") ? src.slice(1) : src);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        transform: "translateZ(0)",
        ...style,
      }}
    >
      <Img
        src={resolvedSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin:
            transformOrigin ||
            (direction === "zoom-out-reveal" ? "center 30%" : "center center"),
          transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
          willChange: "transform",
          backfaceVisibility: "hidden",
          ...imgStyle,
        }}
      />
    </div>
  );
};
