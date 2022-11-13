import React from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";

const Chart = ({ chartData }) => {
  if (!chartData && !chartData?.length) return null;

  const data = [
    {
      color: "steelblue",
      points: chartData,
    },
  ];

  console.log(chartData);

  return (
    <div>
      {chartData && chartData.length <= 1 ? (
        <p>Loading</p>
      ) : (
        <LineChart
          xLabel="Time"
          height={300}
          data={data}
          onPointHover={(obj) => `price: $${obj.y}<br />time: ${obj.x}`}
          ticks={3}
          hideYLabel={true}
          xDisplay={(timestamp) =>
            new Date(timestamp).toLocaleTimeString("en-US")
          }
        />
      )}
    </div>
  );
};

export default Chart;
