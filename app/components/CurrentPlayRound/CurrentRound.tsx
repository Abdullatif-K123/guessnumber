import React from "react";
import styles from "./current.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
interface Player {
  id: number;
  name: string;
  point: number;
  multiplier: number;
  score: number;
}
interface CurrentRoundProps {
  autoPlayersValue: Player[];
}

const CurrentRound: React.FC<CurrentRoundProps> = ({ autoPlayersValue }) => {
  const generatedVal = useSelector(
    (state: RootState) => state.reduxStore.generatedValue
  );
  const animshow = useSelector((state: RootState) => state.reduxStore.animShow);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Point</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {autoPlayersValue.map((user, index) => (
            <tr key={user.id} className={index === 0 ? styles.myTable : ""}>
              <td
                className={`${
                  generatedVal && user.name && !animshow
                    ? generatedVal >= user.multiplier
                      ? styles.winning
                      : styles.losing
                    : ""
                }`}
              >
                {user.name}
              </td>
              <td
                className={`${
                  generatedVal && user.name && !animshow
                    ? generatedVal >= user.multiplier
                      ? styles.winning
                      : styles.losing
                    : ""
                }`}
              >
                {user.point === -1 ? "-" : user.point}
              </td>
              <td
                className={`${
                  generatedVal && user.name && !animshow
                    ? generatedVal >= user.multiplier
                      ? styles.winning
                      : styles.losing
                    : ""
                }`}
              >
                {user.multiplier === -1 ? "-" : user.multiplier}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentRound;
