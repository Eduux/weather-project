"use client";

import { useEffect, useState } from "react";
import { WeatherCard } from "@/components/weather-card";
import { getWeatherData } from "@/domain/weather/actions";
import { CITIES } from "@/domain/weather/cities";
import { City, WeatherData } from "@/domain/weather/types";

const REFRESH_INTERVAL = 10 * 60 * 1000;

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<
    Record<string, WeatherData | null>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAllWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const weatherPromises = Object.keys(CITIES).map((city) =>
        getWeatherData(city as City)
      );

      const results = await Promise.all(weatherPromises);

      const newWeatherData: Record<string, WeatherData> = {};
      Object.keys(CITIES).forEach((city, index) => {
        newWeatherData[city] = results[index];
      });

      setWeatherData(newWeatherData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWeatherData();

    const intervalId = setInterval(fetchAllWeatherData, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const formatLastUpdated = () => {
    if (!lastUpdated) return "";
    return lastUpdated.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-white">
          {lastUpdated && <span>Last updated: {formatLastUpdated()}</span>}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(CITIES).map(([city, coordinates]) => (
          <WeatherCard
            key={city}
            city={city}
            state={coordinates.state}
            country={coordinates.country}
            weatherData={weatherData[city]}
            loading={loading && !weatherData[city]}
          />
        ))}
      </div>

      <div className="text-xs text-white text-center mt-8">
        <p>Data automatically refreshes every 10 minutes</p>
      </div>
    </div>
  );
}
