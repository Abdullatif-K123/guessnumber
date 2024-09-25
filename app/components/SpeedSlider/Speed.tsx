import React from "react";
import styles from "./speed.module.css";
interface SpeedProps {
  speedValue: number;
  onSpeedChange: (value: number) => void;
}
const Speed: React.FC<SpeedProps> = ({ speedValue, onSpeedChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="range"
        className={styles.speed}
        min="1"
        max="5"
        step="1"
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        value={speedValue}
      />
      <div className={styles.speedSelect}>
        <div className={speedValue >= 1 ? styles.selected : ""}>1x</div>
        <div className={speedValue >= 2 ? styles.selected : ""}>2x</div>
        <div className={speedValue >= 3 ? styles.selected : ""}>3x</div>
        <div className={speedValue >= 4 ? styles.selected : ""}>4x</div>
        <div className={speedValue >= 5 ? styles.selected : ""}>5x</div>
      </div>
    </div>
  );
};

export default Speed;
