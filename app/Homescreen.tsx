"use client";

import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

function Homescreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#ca0d10] p-10 flex flex-col justify-center items-center">
      <Card className="max-w-6xl mx-auto bg-gray-900">
        <Text className="text-6xl font-bold text-center mb-5 text-gray-300">
          Kartik&apos;s Weather Channel
        </Text>
        <Subtitle className="text-xl text-center">
          Powered by OpenAi, Next.js 13.4, Tailwind CSS, Tremor 2.0 & More
        </Subtitle>

        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-[#394F68] to-[#ca0d10]">
          <CityPicker showReset />
        </Card>
      </Card>
    </div>
  );
}

export default Homescreen;
