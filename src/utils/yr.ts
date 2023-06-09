import { YrForecastInput } from "../../types-kite-app/dist/es/Types";
import { Enum_Componentforecastforecast_Wind_Direction } from "../../types-kite-app/src/Types";
import { YRForecastData } from "../services/yr";
import { degreesToCompass } from "./weather";

const symbolCodeToStr = (code:string):string|undefined => {
  // if we need some kind of conversion, do it here... https://api.met.no/weatherapi/weathericon/2.0/documentation
  return undefined;
}

export const convertYrForecastToInputs = (spot: string,forecast:YRForecastData):YrForecastInput[] => {
  return forecast.properties.timeseries.map((t) => {
    return {
      spot: spot,
      forecast: {
        air_temperature: t.data.instant.details.air_temperature,
        probability_of_precipitation: t.data.next_1_hours?.details.probability_of_precipitation,
        probability_of_thunder: t.data.next_1_hours?.details.probability_of_thunder,
        symbol: symbolCodeToStr(t.data.next_1_hours?.summary?.symbol_code)||"",
        symbol_code: t.data.next_1_hours?.summary?.symbol_code,
        symbol_confidence: t.data.next_12_hours?.summary?.symbol_confidence,
        wind_from_direction: t.data.instant.details.wind_from_direction,
        wind_speed: t.data.instant.details.wind_speed,
        wind_speed_of_gust: t.data.instant.details.wind_speed_of_gust||0,
        wind_direction: degreesToCompass(t.data.instant.details.wind_from_direction) as Enum_Componentforecastforecast_Wind_Direction,
      },
      provider_updated_at: forecast.properties?.meta?.updated_at,
      timestamp: t.time,
      unique_constraint: `${t.time}_${forecast.geometry.coordinates.reduce((prev,curr)=>`${prev}${curr}`, "")}` 
    }
  });
}

export default {convertYrForecastToInputs}