import React, { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { loadFont as loadEB } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadGreatVibes } from "@remotion/google-fonts/GreatVibes";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadBodoni } from "@remotion/google-fonts/BodoniModa";

// Load fonts with full Vietnamese + Latin subsets via official Remotion loader
const bodoniFont = loadBodoni("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

const ebFont = loadEB("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

const playfairFont = loadPlayfair("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

const playfairItalic = loadPlayfair("italic", {
  weights: ["600"],
  subsets: ["vietnamese", "latin"],
});

const cormorantFont = loadCormorant("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

const greatVibesFont = loadGreatVibes("normal", {
  weights: ["400"],
  subsets: ["vietnamese", "latin"],
});

const jakartaFont = loadJakarta("normal", {
  weights: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
});

export const FontLoader: React.FC = () => {
  const [handle] = useState(() =>
    delayRender("Loading fonts via @remotion/google-fonts")
  );

  useEffect(() => {
    Promise.all([
      bodoniFont.waitUntilDone(),
      ebFont.waitUntilDone(),
      playfairFont.waitUntilDone(),
      playfairItalic.waitUntilDone(),
      cormorantFont.waitUntilDone(),
      greatVibesFont.waitUntilDone(),
      jakartaFont.waitUntilDone(),
      document.fonts.ready,
    ])
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        console.warn("Font loading error:", err);
        continueRender(handle);
      });
  }, [handle]);

  return (
    <style>
      {`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
      `}
    </style>
  );
};
