import React from "react";
import styles from "./game.module.css";
import { LineChart, Line, XAxis } from "recharts";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const GameGraph = () => {
  const generatedValue = useSelector(
    (state: RootState) => state.reduxStore.generatedValue
  );

  // Calculate X and Y values based on generatedValue
  const xValue = Math.floor(generatedValue); // Get the integer part for X-axis
  const yValue = parseFloat((generatedValue % 1).toFixed(2)); // Get the decimal part for Y-axis

  // Create graph values dynamically based on generatedValue
  const graphValue = Array.from({ length: 11 }, (_, index) => ({
    x: index,
    y: index < xValue ? 0.0 : index === xValue ? yValue : 0.0, // X grows first, Y remains 0 until xValue is reached, then yValue is assigned
  }));

  const speedValue = useSelector((state: RootState) => state.reduxStore.speed);

  const calcSpeed = (): number => {
    return 8000 / (speedValue || 1);
  };

  const CustomizedDot = (props: any) => {
    const { cx, cy } = props;
    return <circle cx={cx} cy={cy} r={12} fill="yellow" />;
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
          width={900}
          height={300}
          data={graphValue}
          key={Math.random()}
        >
          {/* Line for X growth */}
          <Line
            type="monotone"
            dataKey="y"
            strokeWidth={3}
            stroke="#fb544e"
            dot={false}
            animationDuration={calcSpeed()}
            hide={generatedValue === 0}
          />
          {/* Customized dot at (xValue, yValue) */}
          <Line
            type="monotone"
            dataKey="y"
            stroke="transparent"
            dot={(props) => {
              if (props.payload.x === xValue) {
                return <CustomizedDot {...props} />;
              }
              return null;
            }}
            animationDuration={calcSpeed()}
          />
          <XAxis
            dataKey="x"
            domain={[0, 10]} // Keep the X-axis fixed at 10
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Optional: Set specific ticks
          />
        </LineChart>
      </div>
    </div>
  );
};

export default GameGraph;
