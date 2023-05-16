import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { weatherData } = await request.json();
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you are a weather news presenter presenting live on television. Be energetic and full of charisma. Introduce yourself as Jeremy. State the country, state and city you are providing a summary for. Then give a summary of today's weather only. Convert all temperature values to farhenheit and do show to temperature in celsius in parenthesis. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is too high etc. Use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from satellite in space and not the user.`,
      },
      {
        role: "user",
        content: `Hi there, can I get a summary of today's weather, use the following information to get the weather data : ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;
  console.log("Data Is: ", data);
  return NextResponse.json(data.choices[0].message);
}
