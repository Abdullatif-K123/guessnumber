import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { random } from "../utils/random";
import { setUsersRanking } from "../store/gameSlice";

// Define the shape of a player

interface Player {
  id: number;
  name: string;
  point: number;
  multiplier: number;
  score: number;
}

// custome hook for managing autoPlayer logic

export const useAutoPlayers = (pointValue: number, multiplierValue: number) => {
  const dispatch = useDispatch();
  const [autoPlayerValue, setAutoPlayerValue] = useState<Player[]>([]);

  useEffect(() => {
    const autoPlayerGuess: Player[] = [];
    for (let i = 0; i < 5; i++) {
      const data: Player = {
        id: i,
        name: i === 0 ? "You" : `Bot ${i}`,
        point: -1,
        multiplier: -1,
        score: 0,
      };
      autoPlayerGuess.push(data);
    }
    setAutoPlayerValue(autoPlayerGuess);
    dispatch(setUsersRanking(autoPlayerGuess));
  }, [dispatch]);

  //Generate a new round of the playing

  const generateAutoPlayers = () => {
    const autoPlayersGuess: Player[] = [];
    const data: Player = {
      id: 0,
      name: "You",
      point: pointValue,
      multiplier: multiplierValue,
      score: Math.round(pointValue * multiplierValue),
    };
    autoPlayersGuess.push(data);

    //Generating the four guesses
    for (let i = 0; i < 4; i++) {
      const p = random(1, 900, 0);
      const m = random(1, 4, 2);
      autoPlayersGuess.push({
        id: i + 1,
        name: `Bot ${i + 1}`,
        point: p,
        multiplier: m,
        score: Math.round(p * m),
      });
    }
    setAutoPlayerValue(autoPlayersGuess);
    dispatch(setUsersRanking(autoPlayersGuess));
  };
  return { autoPlayerValue, generateAutoPlayers };
};
