import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../store/store";
import { random } from "../utils/random";
import toast from "react-hot-toast";
import { useAutoPlayers } from "./useBotPlayers";
import {
  generateVal,
  speedStateVal,
  animStateVal,
  updateBalanceVal,
} from "../store/gameSlice";

// this hooks is to managing the hole game logic

export const useGameLogic = () => {
  const dispatch = useDispatch();
  const [pointsValue, setPointsValue] = useState<number>(50);
  const [speedVal, setSpeedVal] = useState<number>(0);
  const [generatedValue, setGeneratedValue] = useState<number>(random(1, 9, 2));
  const [multiplierValue, setMultiplierValue] = useState<number>(1.0);
  const { autoPlayerValue, generateAutoPlayers } = useAutoPlayers(
    pointsValue,
    multiplierValue
  );
  const animationShow = useSelector(
    (state: RootState) => state.reduxStore.animShow
  );
  const userBalance = useSelector(
    (state: RootState) => state.reduxStore.balance
  );

  // Calculate the timeout duration based on speedValue
  // Starting with the default settings
  const startFunction = () => {
    if (userBalance <= 0 || userBalance <= pointsValue) {
      toast("Opps you don't have enough points to start", {
        duration: 4000,
        style: {},
        className: "",
        icon: "⚠️",
      });
      return;
    }
    const newGeneratedValue = random(1, 9, 2);
    setGeneratedValue(newGeneratedValue);
    dispatch(speedStateVal(speedVal));
    dispatch(generateVal(newGeneratedValue));
    dispatch(updateBalanceVal(userBalance - pointsValue));
    generateAutoPlayers();
    setTimeout(updateBalance, calcTimeout());
  };
  // Update the user's balance after the game round

  const updateBalance = () => {
    dispatch(animStateVal(false));
    if (generatedValue >= multiplierValue) {
      dispatch(
        updateBalanceVal(
          userBalance - pointsValue + pointsValue * multiplierValue
        )
      );
    } else {
      dispatch(updateBalanceVal(userBalance - pointsValue));
    }
  };

  const calcTimeout = (): number => {
    return 3000 / (speedVal || 1); // Higher speedValue means faster animation
  };
  return {
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
  };
};
