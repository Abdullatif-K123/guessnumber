import React, { useEffect, useMemo, useState } from "react";
import styles from "./ranking.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface Player {
  id: number;
  name: string;
  score: number;
  multiplier: number;
}
const Ranking = () => {
  const [newRanking, setNewRanking] = useState<Player[]>([]);
  const animation = useSelector(
    (state: RootState) => state.reduxStore.animShow
  );
  const ranking = useSelector(
    (state: RootState) => state.reduxStore.usersRanking
  ) as Player[];
  const generatedVal = useSelector(
    (state: RootState) => state.reduxStore.generatedValue
  );
  useEffect(() => {
    const ranknew: Player[] = ranking.map((rank) =>
      generatedVal < rank.multiplier
        ? { ...rank, score: 0 } // Return new object with updated score
        : rank
    );

    setNewRanking(ranknew);
  }, [ranking, generatedVal]);

  // Memoize sorted ranking based on newRanking, not ranking
  const sortedRanking = useMemo(() => {
    return [...newRanking].sort((a, b) => b.score - a.score);
  }, [newRanking]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>📊 Ranking</div>

      <div className={styles.rankingBox}>
        <table className={styles.rankingTable}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedRanking.map((player, index) => (
              <tr
                key={player.id}
                className={
                  player.name === "You" && !animation && player.score !== 0
                    ? styles.myResult
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>{animation || player.score === -1 ? "-" : player.name}</td>
                <td>
                  {animation || player.score === -1
                    ? "-"
                    : generatedVal < player.multiplier
                    ? 0
                    : player.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
