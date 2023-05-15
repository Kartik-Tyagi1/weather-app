"use client";

import { Card, Color, Metric, Text } from "@tremor/react";

interface StatCardProps {
  title: string;
  metric: string;
  color?: Color;
}

const StatCard = ({ title, metric, color }: StatCardProps) => {
  return (
    <Card decoration="top" decorationColor={color}>
      <div>
        <Text>{title}</Text>
        <Metric>{metric}</Metric>
      </div>
    </Card>
  );
};

export default StatCard;
