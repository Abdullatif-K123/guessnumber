"use client";
import React from "react";
import styles from "./gamingboard.module.css";
import PointToogle from "../Toggle/PointToogle";
import CurrentRound from "../CurrentPlayRound/CurrentRound";
import MultiplierToggle from "../Toggle/MultiplierToggle";
import { useGameLogic } from "@/app/hooks/useGameBoard";
import Speed from "../SpeedSlider/Speed";
import { Toaster } from "react-hot-toast";
const GamingBoard = () => {
  const {
    speedVal,
    setSpeedVal,
    generateVal,
    pointsValue,
    setPointsValue,
    multiplierValue,
    setMultiplierValue,
    startFunction,
    autoPlayerValue,
    animationShow,
    userBalance,
  } = useGameLogic();
  return (
    <div className={styles.container}>
      <div className={styles.controllerToggle}>
        <div className={styles.toggle}>
          <PointToogle
            pointsValue={pointsValue}
            userBalance={userBalance}
            onChangePoints={setPointsValue}
          />
        </div>

        <div className={styles.toggle}>
          <MultiplierToggle
            multiplierValue={multiplierValue}
            onMultiplierChange={setMultiplierValue}
          />
        </div>
      </div>

      <button
        className={styles.btn}
        onClick={startFunction}
        disabled={animationShow}
      >
        {animationShow ? "Started!!" : "Start"}
      </button>

      <div className={styles.title}>📍 Current round</div>
      <CurrentRound autoPlayersValue={autoPlayerValue} />

      <div className={styles.title}>⏲ Speed</div>
      <Speed speedValue={speedVal} onSpeedChange={setSpeedVal} />
      <Toaster />
    </div>
  );
};

export default GamingBoard;
