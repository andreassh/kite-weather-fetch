import { FcooForecastInput } from "../../types-kite-app/dist/es/Types";
import { FcooForecastData } from "../services/fcoo";

export const convertFcooForecastToInputs = (forecast:FcooForecastData):FcooForecastInput[] => { 

  //TODO: convert to data
  return forecast.WindSpeed.windspeed.time.map((t,idx) => {
    return {
      forecast: {
        air_temperature: forecast.AirTemperature.TMP.data[idx],
        probability_of_precipitation: forecast.Precipitation.precip.data[idx],
        probability_of_thunder: undefined,
        symbol: undefined,
        symbol_code: undefined,
        symbol_confidence: undefined,
        wind_from_direction: forecast.Wind.UGRD.data[idx], // TODO: convert to right format
        wind_speed: forecast.WindSpeed.windspeed.data[idx],
        wind_speed_of_gust: undefined,
      },
      timestamp: t,
      unique_constraint: `${t}_${forecast.WindSpeed.windspeed.lat}${forecast.WindSpeed.windspeed.lon}` 
    }
  });
}

export default {convertFcooForecastToInputs}