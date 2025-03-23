import { render, screen } from "@testing-library/react";
import { WeatherCard } from "../weather-card";

describe("WeatherCard", () => {
  const mockWeatherData = {
    temperature: 20,
    humidity: 65,
    pressure: 1012,
    description: "few clouds",
    icon: "02d",
  };

  const defaultProps = {
    city: "São Paulo",
    state: "SP",
    country: "BR",
    weatherData: mockWeatherData,
    loading: false,
  };

  it("renders loading state correctly", () => {
    render(<WeatherCard {...defaultProps} loading={true} />);
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("renders weather data correctly", () => {
    render(<WeatherCard {...defaultProps} />);

    expect(screen.getByText("São Paulo, SP")).toBeTruthy();
    expect(screen.getByText("Brazil")).toBeTruthy();
    expect(screen.getByText("20°C")).toBeTruthy();
    expect(screen.getByText("few clouds")).toBeTruthy();
    expect(screen.getByText("65%")).toBeTruthy();
    expect(screen.getByText("1012 hPa")).toBeTruthy();
  });

  it("renders no data message when weatherData is null", () => {
    render(<WeatherCard {...defaultProps} weatherData={null} />);
    expect(screen.getByText("No data available")).toBeTruthy();
  });

  it("applies correct temperature color classes", () => {
    const { rerender } = render(
      <WeatherCard
        {...defaultProps}
        weatherData={{ ...mockWeatherData, temperature: 2 }}
      />
    );
    expect(
      screen.getByText("2°C").classList.contains("text-blue-600")
    ).toBeTruthy();

    rerender(
      <WeatherCard
        {...defaultProps}
        weatherData={{ ...mockWeatherData, temperature: 20 }}
      />
    );
    expect(
      screen.getByText("20°C").classList.contains("text-orange-500")
    ).toBeTruthy();

    rerender(
      <WeatherCard
        {...defaultProps}
        weatherData={{ ...mockWeatherData, temperature: 30 }}
      />
    );
    expect(
      screen.getByText("30°C").classList.contains("text-red-600")
    ).toBeTruthy();
  });
});
