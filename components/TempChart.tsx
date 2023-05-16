"use client";

import { toFahrenheit } from "@/lib/conversions";
import { AreaChart, Card, Title } from "@tremor/react";

interface TempChartProps {
  result: Root;
}

const TempChart: React.FC<TempChartProps> = ({ result }) => {
  const hourly = result?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV Index": result.hourly.uv_index[i],
    "Temperature (F)": toFahrenheit(result.hourly.temperature_2m[i]),
  }));

  const dataFormatter = (number: number) => `${number}`;

  return (
    <Card className="bg-slate-200">
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (F)", "UV Index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TempChart;
