import React from "react";
import { useState } from "react";
import useInterval from "@use-it/interval";
import "./styles.css";

export default function Visor(Delay, Text, Count) {
  const [currentWord, setCurrentWord] = useState("");

  useInterval(() => {
    setCurrentWord(Text[Count]);
    Count = Count + 1;
    if (Count === Words.length) {
      setDelay(null);
    }
  }, Delay);

  function start() {
    Words = String(content)
      .replace(/[\n]+/g, " ")
      .replace(/[" "]+/g, " ")
      .split(" ")
      .map((Element) => {
        return Element;
      });
    setDelay(350);
  }
  function fullScreen() {
    if (FullScreenIcon === 1) {
      FullScreenIcon = 0;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } else {
      FullScreenIcon = 1;
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <div className="visor">
      {currentWord}
      <div>
        ({Count}/{Text.length})
      </div>
    </div>
  );
}
