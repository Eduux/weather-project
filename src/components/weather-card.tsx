import Image from "next/image";
import { WeatherData } from "@/domain/weather/types";
import { Loader2, Droplets, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherCardProps {
  city: string;
  state: string;
  country: string;
  weatherData: WeatherData | null;
  loading: boolean;
}

export function WeatherCard({
  city,
  state,
  country,
  weatherData,
  loading,
}: WeatherCardProps) {
  const getTemperatureColor = (temp: number) => {
    if (temp <= 5) return "text-blue-600";
    if (temp <= 25) return "text-orange-500";
    return "text-red-600";
  };

  const getCountryName = (countryCode: string) => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(countryCode);
  };

  return (
    <Card className="overflow-hidden py-0 pb-6 border-none">
      <CardHeader className="bg-[#004983] py-2">
        <CardTitle className="text-xl text-white">
          {city}, {state}
        </CardTitle>
        <p className="text-sm text-white">{getCountryName(country)}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : weatherData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 border-b border-gray-200 pb-4">
              {weatherData.icon && (
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                  width={90}
                  height={90}
                />
              )}
              <div className="text-center">
                <div
                  className={`text-4xl font-bold ${getTemperatureColor(
                    weatherData.temperature
                  )}`}
                >
                  {Math.round(weatherData.temperature)}°C
                </div>
                <div className="text-sm capitalize mt-1">
                  {weatherData.description}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">Humidity</div>
                  <div className="font-medium">{weatherData.humidity}%</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Pressure</div>
                  <div className="font-medium">{weatherData.pressure} hPa</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
