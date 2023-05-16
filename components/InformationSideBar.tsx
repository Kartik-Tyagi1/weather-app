"use client";

import { toFahrenheit } from "@/lib/conversions";
import weatherCodeToString from "@/lib/weatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";

interface InformationSideBarProps {
  city: string;
  lat: string;
  long: string;
  result: Root;
}

const InformationSideBar = ({
  city,
  lat,
  long,
  result,
}: InformationSideBarProps) => {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#ca0d10] text-gray-300 p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="text-sm text-gray-400 pt-2">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-5" />
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <hr className="my-5" />
      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[result.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[result.current_weather.weathercode].label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-6xl font-semibold">
              {toFahrenheit(result.current_weather.temperature).toFixed(1)}°F
            </p>
            <p className="text-right font-extralight text-lg">
              {weatherCodeToString[result.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#c90627] rounded-md bg-[#85404e]">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="text-2xl uppercase">
              {new Date(result.daily.sunrise[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#c90627] rounded-md bg-[#85404e]">
          <MoonIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="text-2xl uppercase">
              {new Date(result.daily.sunset[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSideBar;
