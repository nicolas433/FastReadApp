import React from "react";
import { useState } from "react";
import useInterval from "@use-it/interval";
import "./styles.css";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";

export default function App() {
  let Words = [];
  const [count, setCount] = useState(0);
  const [content, setContent] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [delayInput, setDelayInput] = useState(300);
  const [delay, setDelay] = useState(null);
  const [fullScreenControll, setFullScreenControll] = useState(0);
  const [words, setWords] = useState([]);

  useInterval(() => {
    setCurrentWord(words[count]);
    setCount(count + 1);
    if (
      words[count][words[count].length - 1] === "." ||
      words[count][words[count].length - 1] === ":" ||
      words[count][words[count].length - 1] === ";" ||
      words[count][words[count].length - 1] === '"' ||
      words[count][words[count].length - 1] === "'" ||
      words[count][words[count].length - 1] === ","
    ) {
      setDelay(delay + 200);
    } else {
      setDelay(delayInput);
    }
    if (count === words.length) {
      setDelay(null);
    }
  }, delay);

  function start() {
    if (delay === null) {
      console.log(Words);
      setWords([]);
      setCount(count - count);
      setDelay(delay - delay);
      Words = String(content)
        .replace(/[\n]+/g, " ")
        .replace(/[" "]+/g, " ")
        .split(" ")
        .map((Element) => {
          return Element;
        });
      console.log(Words.length);
      setWords(Words);
      setDelay(delay + delayInput);
    }
  }

  function fullScreen() {
    if (fullScreenControll === 1) {
      setFullScreenControll(0);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } else {
      setFullScreenControll(1);
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <div className="App">
      <div
        className="left-side"
        style={{
          display: fullScreenControll === 1 ? "none" : "flex"
        }}
      >
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <label>Intervalo entre palavras</label>
        <select
          onChange={(e) => {
            if (delay === null) {
              setDelayInput(e.target.value);
            }
          }}
        >
          <option value="200">200</option>
          <option value="300" selected>
            300
          </option>
          <option value="450">450</option>
          <option value="600">600</option>
        </select>
        <button
          onClick={() => {
            Words = [];
            start();
          }}
        >
          Mostrar
        </button>
        <button className="dark-light-mode">DarkMode</button>
      </div>
      <div
        className="right-side"
        style={{
          width: fullScreenControll === 1 ? "100%" : "78%"
        }}
      >
        <div className="visor">{currentWord}</div>
        <div className="controls">
          <div>
            <button
              onClick={() => {
                setDelay(null);
                setCount(count - 1);
                setCurrentWord(words[count]);
              }}
              className="play-pause"
            >
              <FaBackward size="25"></FaBackward>
            </button>
            <button
              onClick={() => {
                if (count !== 0) {
                  setDelay(delayInput);
                }
              }}
              style={{ display: delay != null ? "none" : "" }}
              className="play-pause"
            >
              <FaPlay size="25"></FaPlay>
            </button>

            <button
              onClick={() => {
                setDelay(null);
              }}
              style={{ display: delay === null ? "none" : "" }}
              className="play-pause"
            >
              <FaPause size="25"></FaPause>
            </button>
            <button
              onClick={() => {
                setDelay(null);
                setCount(count + 1);
                setCurrentWord(words[count]);
              }}
              className="play-pause"
            >
              <FaForward size="25"></FaForward>
            </button>
          </div>

          <button onClick={fullScreen} className="full-screen">
            <BsFullscreenExit
              size="25"
              style={{ display: fullScreenControll === 0 ? "none" : "" }}
            ></BsFullscreenExit>
            <BsFullscreen
              size="25"
              style={{ display: fullScreenControll === 1 ? "none" : "" }}
            ></BsFullscreen>
          </button>
        </div>
      </div>
    </div>
  );
}
