"use server";

import type { WeatherData, City } from "./types";
import { CITIES } from "./cities";

export async function getWeatherData(city: City): Promise<WeatherData> {
  try {
    const coordinates = CITIES[city];

    if (!coordinates) {
      throw new Error(`Coordinates not found for ${city}`);
    }
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      throw new Error("OpenWeatherMap API key is not configured");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.main || !data.weather) {
      throw new Error("Invalid weather data received");
    }

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    throw error;
  }
}
