"use client";

import { AreaChart, Card, Title } from "@tremor/react";

interface RainChartProps {
  result: Root;
}

function RainChart({ result }: RainChartProps) {
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
    "Rain (%)": result.hourly.precipitation_probability[i],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card className="bg-slate-200">
      <Title>Chances of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Rain (%)"]}
        colors={["blue"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default RainChart;
