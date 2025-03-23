import { CITIES } from "./cities";

export interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
}

export type City = keyof typeof CITIES;
