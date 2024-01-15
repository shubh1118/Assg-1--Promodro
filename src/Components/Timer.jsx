import React, { useEffect, useRef, useState } from "react";

import { SlControlPause, SlControlPlay, SlReload } from "react-icons/sl";

import { Link } from "react-router-dom";

import "../Styles/timer.css";

const Timer = () => {
  const [minute, setMinute] = useState(25);

  const [second, setSecond] = useState(0);

  const [running, setRunnig] = useState(true);

  const [display, setDisplay] = useState(false);

  const id = useRef();

  useEffect(() => {
    if (running) {
      id.current = setInterval(() => {
        if (second === 0) {
          if (minute !== 0) {
            setSecond(59);
            setMinute(minute - 1);
          } else {
            let m = display ? 24 : 4;
            let s = 59;

            setMinute(m);
            setSecond(s);
            setDisplay(!display);
          }
        } else {
          setSecond(second - 1);
        }
      }, 1000);
    }

    return () => clearInterval(id.current);
  });

  return (
    <>
      <div className="container">
        <Link to={"/"} className="btn btn-warning log-btn">
          Logout
        </Link>
      </div>
      <div className="container timer">
        <h1 className="display-1">
          {" "}
          The Pomodoro <span className="text-black">Timer</span>
        </h1>

        <div className="message">
          {display && (
            <div>
              Break Time ! , <br />
              New Timer will start after 5 min{" "}
            </div>
          )}
        </div>

        <div className="box">
          <p>
            <span>{minute < 10 ? "0" + minute : minute}</span> :{" "}
            <span>{second < 10 ? "0" + second : second}</span>
          </p>
        </div>

        <div className="func-btn">
          <div
            className="reset"
            onClick={() => {
              setMinute(25) || setSecond(0);
            }}
          >
            <div className=" round">
              <SlReload />
            </div>
          </div>
          <button
            className="play-pause"
            onClick={() => {
              if (running) clearInterval(id.current);
              setRunnig(!running);
            }}
          >
            {running ? (
              <div className="play">
                <SlControlPause />
              </div>
            ) : (
              <div className="pause">
                <SlControlPlay />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
