import * as React from "react";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Pending", value: 400, color: "#9810fa" },
  { label: "In Progress", value: 300, color: "#74d4ff" },
  { label: "Completed", value: 300, color: "#05df72" },
];

const settings = {
  margin: { left: 80 },
  color: "white",
  width: 400,
  height: 400,
  hideLegend: false,
};

export default function DonutChart() {
  return (
    <PieChart
      series={[
        { innerRadius: 90, outerRadius: 150, data, arcLabel: "value", cx: 95 ,}
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold',
          color: '#fff !important'
        },
      }}
      {...settings}
    />
  );
}
