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
  style,
  imgStyle,
}) => {
  const frame = useCurrentFrame();

  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;

  if (direction === "zoom-out-reveal") {
    const sFrame = startFrame;
    const zDuration = zoomDuration ?? Math.max(60, durationInFrames - sFrame - 30);
    const progress = interpolate(
      frame,
      [sFrame, sFrame + zDuration],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    scale = interpolate(
      progress,
      [0, 1],
      [initialScale ?? 1.42, finalScale ?? 1.0]
    );
  } else if (direction === "zoom-in") {
    scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
      extrapolateRight: "clamp",
    });
  } else if (direction === "zoom-out") {
    scale = interpolate(frame, [0, durationInFrames], [1.06, 1.0], {
      extrapolateRight: "clamp",
    });
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
