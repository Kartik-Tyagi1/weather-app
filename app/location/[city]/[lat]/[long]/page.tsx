import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";

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
    <div>
      <div>
        {/* Information Panel */}
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at: {""}
              {new Date(result.current_weather.time).toLocaleString()} (
              {result.timezone})
            </p>
          </div>
          <div>
            <CalloutCard message="This is where GPT will go" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
