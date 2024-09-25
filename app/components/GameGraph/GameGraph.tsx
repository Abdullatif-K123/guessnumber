/* eslint-disable */
import React from "react";
import styles from "./game.module.css";
import { LineChart, Line, XAxis } from "recharts";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { DotProps } from "recharts"; // Import types from recharts
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

  // Define a type for the payload that includes the x value
  interface CustomDotProps extends DotProps {
    payload: {
      x: number; // Define x as part of the payload
    };
    xValue: number; // Custom prop to compare the x value
  }

  // Define the custom dot component with proper types
  const CustomDotWithCondition: React.FC<CustomDotProps> = (props) => {
    const { cx, cy, payload, xValue } = props;

    if (payload.x !== xValue) {
      return null; // Return null if the condition is not met
    }

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
            dot={(props) => (
              <CustomDotWithCondition {...props} xValue={xValue} /> // Use the custom dot component
            )}
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
