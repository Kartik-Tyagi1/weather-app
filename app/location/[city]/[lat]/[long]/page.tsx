import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import InformationSideBar from "@/components/InformationSideBar";
import StatCard from "@/components/StatCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { toFahrenheit, toMilesHour } from "@/lib/conversions";

interface WeatherPageProps {
  params: {
    city: string;
    lat: string;
    long: string;
  };
}

const WeatherPage = async ({
  params: { city, lat, long },
}: WeatherPageProps) => {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "GMT",
    },
  });

  const result: Root = data.myQuery;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Information Panel */}
      <InformationSideBar city={city} result={result} lat={lat} long={long} />
      <div className="flex-1 p-5 lg:p-10">
        {/* Stat Cards */}
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at: {""}
              {new Date(result.current_weather.time).toLocaleString()} (
              {result.timezone})
            </p>
          </div>
          <div className="m-2 mb-10">
            <CalloutCard message="This is where GPT will go" />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Today's Max Temperature"
              metric={`${toFahrenheit(
                result.daily.temperature_2m_max[0]
              ).toFixed(1)}°F`}
              color="yellow"
            />
            <StatCard
              title="Today's Min Temperature"
              metric={`${toFahrenheit(
                result.daily.temperature_2m_min[0]
              ).toFixed(1)}°F`}
              color="green"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={`${result.daily.uv_index_max[0].toFixed(1)}`}
                color="red"
              />
              {Number(result.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="UV Index is high, make sure to wear sunscreen!"
                  warning
                />
              )}
            </div>
            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${toMilesHour(
                  result.current_weather.windspeed
                ).toFixed(1)} mph`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${result.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />
        {/* Charts */}
        <div className="space-y-3">
          {/* Temperature Chart */}
          {/* Rain Chart */}
          {/* Humidity Chart */}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
