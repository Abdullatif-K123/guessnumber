import React from "react";
import styles from "./game.module.css";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
const GameGraph = () => {
  const generatedValue = useSelector(
    (state: RootState) => state.reduxStore.generatedValue
  );
  const graphValue = [{ value: 0 }, { value: 0 }, { value: generatedValue }];
  const speedValue = useSelector((state: RootState) => state.reduxStore.speed);
  // calculate the speed value here
  const calcSpeed = (): number => {
    return 3000 / (speedValue || 1);
  };
  return (
    <div className={styles.container} data-testid="info-graph-container">
      <div className={styles.graphicBox}>
        <div className={styles.result}>
          <CountUp
            start={0}
            end={generatedValue}
            redraw={false}
            duration={calcSpeed() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            suffix="x"
          />
        </div>

        <LineChart
          width={500}
          height={300}
          data={graphValue}
          key={Math.random()}
        >
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#fb544e"
            dot={false}
            animationDuration={calcSpeed()}
            hide={generatedValue === 0}
          />
          <YAxis domain={[0, 10]} hide={true} />
          <XAxis dataKey="value" hide={true} />
        </LineChart>
      </div>
    </div>
  );
};

export default GameGraph;
