import { SunIcon } from "@heroicons/react/solid";

function Loading() {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#ca0d10] min-h-screen flex flex-col items-center justify-center text-slate-300">
      <SunIcon className="h-24 w-24 animate-bounce text-yellow-500" />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading City Weather Information
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        We Are Gathering Data & Generating Ai Summary of the weather!
      </h2>
    </div>
  );
}

export default Loading;
