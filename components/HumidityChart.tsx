"use client";

import { AreaChart, Card, Title } from "@tremor/react";

interface HumidityChartProps {
  result: Root;
}

function HumidityChart({ result }: HumidityChartProps) {
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
    "Humidity (%)": result.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card className="bg-slate-200">
      <Title>Humidity</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Humidity (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default HumidityChart;
