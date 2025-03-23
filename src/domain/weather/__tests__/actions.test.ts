import { getWeatherData } from "../actions";
import { City } from "../types";

global.fetch = jest.fn();

describe("getWeatherData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and transforms weather data correctly", async () => {
    const mockApiResponse = {
      main: {
        temp: 20,
        humidity: 65,
        pressure: 1012,
      },
      weather: [
        {
          description: "few clouds",
          icon: "02d",
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getWeatherData("Joinville" as City);

    expect(result).toEqual({
      temperature: 20,
      humidity: 65,
      pressure: 1012,
      description: "few clouds",
      icon: "02d",
    });
  });

  it("throws error when API request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getWeatherData("Joinville" as City)).rejects.toThrow(
      "Weather API returned 404"
    );
  });

  it("throws error when API returns invalid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        main: {},
      }),
    });

    await expect(getWeatherData("Joinville" as City)).rejects.toThrow(
      "Invalid weather data received"
    );
  });
});
