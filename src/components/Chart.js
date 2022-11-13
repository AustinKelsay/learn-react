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
    <div style={{ paddingLeft: "1%" }}>
      {chartData && chartData.length <= 1 ? (
        <p>Loading</p>
      ) : (
        <LineChart
          xLabel="Time"
          //  ToDo: Reassign height and width to fit on mobile screens
          height={300}
          width={550}
          data={data}
          onPointHover={(obj) => `price: $${obj.y}<br />time: ${obj.x}`}
          ticks={4}
          hideYLabel={true}
          hideXLabel={true}
          xDisplay={(timestamp) =>
            new Date(timestamp).toLocaleTimeString("en-US")
          }
        />
      )}
    </div>
  );
};

export default Chart;
