import { render, screen, act, waitFor } from "@testing-library/react";
import { WeatherDashboard } from "../weather-dashboard";
import { getWeatherData } from "@/domain/weather/actions";
import { CITIES } from "@/domain/weather/cities";

jest.mock("@/domain/weather/actions", () => ({
  getWeatherData: jest.fn(),
}));

describe("WeatherDashboard", () => {
  const mockWeatherData = {
    temperature: 20,
    humidity: 65,
    pressure: 1012,
    description: "few clouds",
    icon: "02d",
  };

  beforeEach(() => {
    jest.useFakeTimers();
    (getWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("fetches and displays weather data for all cities", async () => {
    render(<WeatherDashboard />);

    Object.keys(CITIES).forEach(() => {
      expect(screen.getAllByRole("status")).toHaveLength(
        Object.keys(CITIES).length
      );
    });

    await waitFor(() => {
      Object.keys(CITIES).forEach((city) => {
        expect(screen.getByTestId(`city-${city}`)).toBeTruthy();
      });
    });

    expect(getWeatherData).toHaveBeenCalledTimes(Object.keys(CITIES).length);
  });

  it("updates data periodically", async () => {
    render(<WeatherDashboard />);

    await waitFor(() => {
      expect(getWeatherData).toHaveBeenCalledTimes(Object.keys(CITIES).length);
    });

    act(() => {
      jest.advanceTimersByTime(10 * 60 * 1000);
    });

    await waitFor(() => {
      expect(getWeatherData).toHaveBeenCalledTimes(
        Object.keys(CITIES).length * 2
      );
    });
  });

  it("displays error message when fetch fails", async () => {
    const errorMessage =
      "Failed to fetch weather data. Please try again later.";
    (getWeatherData as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<WeatherDashboard />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });
});
