"use client";
import React from "react";
import styles from "./toggle.module.css";

interface TogglePointsProps {
  pointsValue: number;
  userBalance: number;
  onChangePoints: (value: number) => void;
}
const PointToogle: React.FC<TogglePointsProps> = ({
  pointsValue,
  userBalance,
  onChangePoints,
}) => {
  const onChangeMinus = () => {
    if (pointsValue > 25) onChangePoints(pointsValue - 25);
  };
  const onChangePlus = () => {
    if (userBalance >= pointsValue + 25) onChangePoints(pointsValue + 25);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Points</div>
      <div className={styles.toggleController}>
        <button
          className={styles.toggleMinusPlus}
          tabIndex={0}
          onClick={onChangeMinus}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onChangeMinus();
            }
          }}
        >
          ▼
        </button>
        <input
          type="number"
          className={styles.inputToggle}
          min="0"
          max={userBalance}
          step="25"
          onChange={(e) => onChangePoints(Number(e.target.value))}
          value={pointsValue}
        />
        <button className={styles.toggleMinusPlus} onClick={onChangePlus}>
          {" "}
          ▲
        </button>
      </div>
    </div>
  );
};

export default PointToogle;
