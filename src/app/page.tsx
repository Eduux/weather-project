import { WeatherDashboard } from "@/components/weather-dashboard";
import { Sun } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8 space-x-2">
          <Sun className="w-10 h-10 text-yellow-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            Weather Dashboard
          </h1>
        </div>
        <WeatherDashboard />
      </div>
    </main>
  );
}
