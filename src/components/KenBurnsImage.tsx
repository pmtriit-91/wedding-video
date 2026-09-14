import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

interface KenBurnsImageProps {
  src: string;
  durationInFrames: number;
  direction?: "zoom-in" | "zoom-out" | "pan-right" | "pan-left" | "pan-up";
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  durationInFrames,
  direction = "zoom-in",
  style,
  imgStyle,
}) => {
  const frame = useCurrentFrame();

  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;

  if (direction === "zoom-in") {
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

  // Resolve path: if starts with "photos/", resolve with staticFile
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
        ...style,
      }}
    >
      <Img
        src={resolvedSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transition: "transform 0.1s linear",
          filter: "contrast(1.02) saturate(1.03)",
          ...imgStyle,
        }}
      />
    </div>
  );
};
