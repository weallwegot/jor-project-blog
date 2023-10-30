"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

import { motion } from "framer-motion";
const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const timer = React.useRef();

  React.useEffect(() => {
    if (!isPlaying && timer.current) {
      console.log("clearing timer! ", timer.current);
      window.clearInterval(timer.current);
      timer.current = null;
      return;
    }
    timer.current = window.setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);
    return () => window.clearInterval(timer.current);
  }, [isPlaying]);

  function switchPlayingStatus() {
    setIsPlaying(!isPlaying);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  initial={true}
                  layoutId="background-backdrop"
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!isPlaying ? (
            <button onClick={switchPlayingStatus}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button onClick={switchPlayingStatus}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={() => setTimeElapsed(0)}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
