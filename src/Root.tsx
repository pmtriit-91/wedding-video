import React from "react";
import { Composition } from "remotion";
import { MainVideo, TOTAL_FRAMES } from "./MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WeddingVideo"
        component={MainVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={60}
        width={2560}
        height={1440}
        defaultProps={{}}
      />
    </>
  );
};
