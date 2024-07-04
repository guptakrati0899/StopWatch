import React, { useState, useEffect, useRef } from "react";
import "../component/StopWatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleTimer = (action) => {
    if (action === "start") setRunning(true);
    if (action === "pause") setRunning(false);
    if (action === "stop") {
      setRunning(false);
      setTime(0);
    }
    if (action === "reset") setTime(0);
  };

  const formatTime = (time) => {
    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h2>Stop Watch</h2>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={() => handleTimer(running ? "pause" : "start")}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => handleTimer("stop")}>Stop</button>
        <button onClick={() => handleTimer("reset")}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
