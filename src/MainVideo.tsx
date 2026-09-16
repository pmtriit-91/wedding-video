import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Background } from "./components/Background";
import { FloralDecor } from "./components/FloralDecor";
import { FontLoader } from "./components/FontLoader";
import { GoldenDust } from "./components/GoldenDust";
import { Scene01_Welcome } from "./scenes/Scene01_Welcome";
import { Scene02_SaveTheDate } from "./scenes/Scene02_SaveTheDate";
import { Scene03_BrideIntro } from "./scenes/Scene03_BrideIntro";
import { Scene04_GroomIntro } from "./scenes/Scene04_GroomIntro";
import { Scene05_ParentGratitude } from "./scenes/Scene05_ParentGratitude";
import { Scene06_DatingMemories } from "./scenes/Scene06_DatingMemories";
import { Scene07_TheBigDay } from "./scenes/Scene07_TheBigDay";
import { Scene08_GuestWelcome } from "./scenes/Scene08_GuestWelcome";
import { Scene09_CeremonyJoy } from "./scenes/Scene09_CeremonyJoy";
import { Scene10_WishesAndFallInLove } from "./scenes/Scene10_WishesAndFallInLove";
import { Scene11_ForeverHappy } from "./scenes/Scene11_ForeverHappy";
import { Scene12_Outro } from "./scenes/Scene12_Outro";

export const SCENE_DURATIONS = {
  scene01: 360,
  scene02: 480,
  scene03: 360,
  scene04: 480,
  scene05: 600,
  scene06: 510,
  scene07: 480,
  scene08: 510,
  scene09: 480,
  scene10: 1530,
  scene11: 510,
  scene12: 685,
};

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0
);

export const MainVideo: React.FC = () => {
  // Tính toán thời điểm bắt đầu (from frame) cho từng cảnh
  let currentStart = 0;
  const starts: number[] = [];
  const durations = Object.values(SCENE_DURATIONS);
  for (const d of durations) {
    starts.push(currentStart);
    currentStart += d;
  }

  const frame = useCurrentFrame();
  const hideGlobalFloral = frame >= starts[4] && frame < starts[8];

  return (
    <div
      style={{
        position: "relative",
        width: 2560,
        height: 1440,
        backgroundColor: "#F7F3EB",
        overflow: "hidden",
      }}
    >
      <FontLoader />

      {/* Nhạc nền "Ngày Đầu Tiên" (Đức Phúc) */}
      <Audio src={staticFile("audio/wedding-song.mp3")} volume={1} />

      {/* Lớp nền lụa satin ấm áp chạy xuyên suốt video */}
      <Background />

      {/* Hạt bụi sáng vàng lơ lửng lung linh */}
      <GoldenDust count={45} />

      {/* Cành hoa trang trí góc cố định (ẩn ở Scene05 & Scene06 để tự chủ hoa văn độc quyền) */}
      {!hideGlobalFloral && (
        <>
          <FloralDecor position="top-right" opacity={0.25} scale={1.3} />
          <FloralDecor position="bottom-left" opacity={0.25} scale={1.3} />
        </>
      )}

      {/* 12 Phân cảnh trình chiếu */}
      <Sequence from={starts[0]} durationInFrames={SCENE_DURATIONS.scene01}>
        <Scene01_Welcome durationInFrames={SCENE_DURATIONS.scene01} />
      </Sequence>

      <Sequence from={starts[1]} durationInFrames={SCENE_DURATIONS.scene02}>
        <Scene02_SaveTheDate durationInFrames={SCENE_DURATIONS.scene02} />
      </Sequence>

      <Sequence
  from={starts[2]}
  durationInFrames={SCENE_DURATIONS.scene03}
  style={{
    scale: 1.042
  }}>
        <Scene03_BrideIntro durationInFrames={SCENE_DURATIONS.scene03} />
      </Sequence>

      <Sequence from={starts[3]} durationInFrames={SCENE_DURATIONS.scene04}>
        <Scene04_GroomIntro durationInFrames={SCENE_DURATIONS.scene04} />
      </Sequence>

      <Sequence from={starts[4]} durationInFrames={SCENE_DURATIONS.scene05}>
        <Scene05_ParentGratitude durationInFrames={SCENE_DURATIONS.scene05} />
      </Sequence>

      <Sequence from={starts[5]} durationInFrames={SCENE_DURATIONS.scene06}>
        <Scene06_DatingMemories durationInFrames={SCENE_DURATIONS.scene06} />
      </Sequence>

      <Sequence from={starts[6]} durationInFrames={SCENE_DURATIONS.scene07}>
        <Scene07_TheBigDay durationInFrames={SCENE_DURATIONS.scene07} />
      </Sequence>

      <Sequence from={starts[7]} durationInFrames={SCENE_DURATIONS.scene08}>
        <Scene08_GuestWelcome durationInFrames={SCENE_DURATIONS.scene08} />
      </Sequence>

      <Sequence from={starts[8]} durationInFrames={SCENE_DURATIONS.scene09}>
        <Scene09_CeremonyJoy durationInFrames={SCENE_DURATIONS.scene09} />
      </Sequence>

      <Sequence from={starts[9]} durationInFrames={SCENE_DURATIONS.scene10}>
        <Scene10_WishesAndFallInLove durationInFrames={SCENE_DURATIONS.scene10} />
      </Sequence>

      <Sequence from={starts[10]} durationInFrames={SCENE_DURATIONS.scene11}>
        <Scene11_ForeverHappy durationInFrames={SCENE_DURATIONS.scene11} />
      </Sequence>

      <Sequence from={starts[11]} durationInFrames={SCENE_DURATIONS.scene12}>
        <Scene12_Outro durationInFrames={SCENE_DURATIONS.scene12} />
      </Sequence>
    </div>
  );
};
