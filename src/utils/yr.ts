import { YrForecastInput } from "../../types-kite-app/dist/es/Types";
import { YRForecastData } from "../services/yr";

const symbolCodeToStr = (code:string) => {
  // TODO: Build converter from table: https://nrkno.github.io/yr-weather-symbols/
  return "to_be_implemented"
}

export const convertYrForecastToInputs = (forecast:YRForecastData):YrForecastInput[] => {
  return forecast.properties.timeseries.map((t) => {
    return {
      forecast: {
        air_temperature: t.data.instant.details.air_temperature,
        probability_of_precipitation: t.data.next_1_hours?.details.probability_of_precipitation,
        probability_of_thunder: t.data.next_1_hours?.details.probability_of_thunder,
        symbol: symbolCodeToStr(t.data.next_1_hours?.summary?.symbol_code),
        symbol_code: t.data.next_1_hours?.summary?.symbol_code,
        symbol_confidence: t.data.next_12_hours?.summary?.symbol_confidence,
        wind_from_direction: t.data.instant.details.wind_from_direction,
        wind_speed: t.data.instant.details.wind_speed,
        wind_speed_of_gust: t.data.instant.details.wind_speed_of_gust,
      },
      provider_updated_at: forecast.properties?.meta?.updated_at,
      timestamp: t.time,
      unique_constraint: `${t.time}_${forecast.geometry.coordinates.reduce((prev,curr)=>`${prev}${curr}`, "")}` 
    }
  });
}