import React from "react";
import styles from "./current.module.css";
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
              <td>{user.name}</td>
              <td>{user.point === -1 ? "-" : user.point}</td>
              <td>{user.multiplier === -1 ? "-" : user.multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentRound;
