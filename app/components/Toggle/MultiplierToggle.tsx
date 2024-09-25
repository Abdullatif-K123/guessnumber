"use client";
import React from "react";
import styles from "./toggle.module.css";

interface ToggleMultiplierProps {
  multiplierValue: number;
  onMultiplierChange: (value: number) => void;
}
const MultiplierToggle: React.FC<ToggleMultiplierProps> = ({
  multiplierValue,
  onMultiplierChange,
}) => {
  //   Multiplier Toggle components for both the minus and plus

  const onChangeMinus = () => {
    if (multiplierValue >= 1.25) onMultiplierChange(multiplierValue - 0.25);
  };

  const onChangePlus = () => {
    if (10 >= multiplierValue + 0.25)
      onMultiplierChange(multiplierValue + 0.25);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Multiplier</div>
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
          min="0.25"
          max="10"
          step="0.25"
          onChange={(e) => onMultiplierChange(Number(e.target.value))}
          value={multiplierValue}
        />
        <button className={styles.toggleMinusPlus} onClick={onChangePlus}>
          {" "}
          ▲
        </button>
      </div>
    </div>
  );
};

export default MultiplierToggle;
