import React from "react";

interface FloralDecorProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  opacity?: number;
  scale?: number;
}

export const FloralDecor: React.FC<FloralDecorProps> = ({
  position = "top-left",
  color = "#C69B56",
  opacity = 0.55,
  scale = 1,
}) => {
  let style: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    opacity,
    zIndex: 10,
  };

  let transform = `scale(${scale})`;

  if (position === "top-left") {
    style = { ...style, top: 40, left: 40 };
  } else if (position === "top-right") {
    style = { ...style, top: 40, right: 40 };
    transform += " scaleX(-1)";
  } else if (position === "bottom-left") {
    style = { ...style, bottom: 40, left: 40 };
    transform += " scaleY(-1)";
  } else if (position === "bottom-right") {
    style = { ...style, bottom: 40, right: 40 };
    transform += " scale(-1, -1)";
  }

  style.transform = transform;

  return (
    <div style={style}>
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 150 C 40 100, 80 60, 150 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Nhánh lá 1 */}
        <path
          d="M50 115 C 45 100, 35 95, 25 102 C 30 115, 45 118, 50 115 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M75 92 C 85 80, 95 85, 92 98 C 80 102, 73 95, 75 92 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        {/* Nhánh lá 2 */}
        <path
          d="M98 68 C 92 52, 80 48, 72 57 C 78 70, 92 72, 98 68 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M120 45 C 132 35, 142 40, 138 52 C 126 56, 118 48, 120 45 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        {/* Búp hoa nhỏ đầu cành */}
        <circle cx="150" cy="10" r="3.5" stroke={color} strokeWidth="1.2" />
        <circle cx="140" cy="18" r="2" fill={color} />
      </svg>
    </div>
  );
};
