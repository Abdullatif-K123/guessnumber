import React, { useMemo } from "react";
import styles from "./ranking.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface Player {
  id: number;
  name: string;
  score: number;
}
const Ranking = () => {
  const animation = useSelector(
    (state: RootState) => state.reduxStore.animShow
  );
  const ranking = useSelector(
    (state: RootState) => state.reduxStore.usersRanking
  ) as Player[];

  const sortedRanking = useMemo(() => {
    return [...ranking].sort((a, b) => b.score - a.score);
  }, [ranking]);
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
                    ? "myResult"
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>{animation || player.score === 0 ? "-" : player.name}</td>
                <td>{animation || player.score === 0 ? "-" : player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
