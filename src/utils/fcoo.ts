import { Enum_Componentforecastforecast_Wind_Direction, FcooForecastInput } from "../../types-kite-app/dist/es/Types";
import { FcooForecastData } from "../services/fcoo";
import { degreesToCompass } from "./weather";

export const covertFcooWindDirToDegrees = (windDir:number) => {
  /**  
    Fcoo windirections goes from -15 -> 15 . needs to be converted to 0-360 degrees.
    We multiple windDir with 12 (factor) as 360 / 30 = 12. 30 is the span from -15 -> 15 possible values

    If multiplied number (degrees) is < 0, we calculate 360 - degrees to get the value. 
    Otherwise degrees is result
  */
  const factor = 12;
  return windDir < 0 ? 360 - (windDir * factor) : windDir * factor;
}

export const convertFcooForecastToInputs = (forecast:FcooForecastData):FcooForecastInput[] => { 
  return forecast.WindSpeed.windspeed.time.map((t,idx) => {
    const windDegrees = covertFcooWindDirToDegrees(forecast.Wind.UGRD.data[idx]);
    return {
      forecast: {
        air_temperature: forecast.AirTemperature.TMP.data[idx],
        probability_of_precipitation: forecast.Precipitation.precip.data[idx],
        probability_of_thunder: -1,
        symbol: "",
        symbol_code: "",
        symbol_confidence: "",
        wind_from_direction: windDegrees, // TODO: check that this fits correctly with fcoo visualization!!
        wind_speed: forecast.WindSpeed.windspeed.data[idx],
        wind_speed_of_gust: -1,
        wind_direction: degreesToCompass(windDegrees) as Enum_Componentforecastforecast_Wind_Direction,
      },
      timestamp: t,
      unique_constraint: `${t}_${forecast.WindSpeed.windspeed.lat}${forecast.WindSpeed.windspeed.lon}` 
    }
  });
}

export default {convertFcooForecastToInputs}