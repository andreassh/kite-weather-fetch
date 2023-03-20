import { YrForecastInput } from "../../types-kite-app/dist/es/Types";
import fetch from 'cross-fetch';
import dotenv from "dotenv";
import errorHandler from "../errorHandler";

dotenv.config();

const apiUrl = process.env.YR_API_URL

export const getYrForecast = async (lat:number, long:number):Promise<YrForecastInput[]> => {

  const url = `${apiUrl}/complete?lat=${lat}&lon=${long}`;

  try {
    const data = await fetch(url);
    console.log('data', data);

    // returning dummy data for now
    return [{
      forecast: {
        air_temperature: 1.0,
        probability_of_precipitation: 1.0,
        probability_of_thunder: 1.0,
        symbol: 'Some symbol',
        symbol_code: 'Some symbol',
        symbol_confidence: 'Some symbol',
        wind_from_direction: 1.0,
        wind_speed: 1.0,
        wind_speed_of_gust: 1.0,
      },
      provider_updated_at: '123',
      timestamp: '123' 
    }];
  } catch (err) {
    console.error(err);
    errorHandler(`Error fetching YR data for spot with coordinates lat: ${lat}, long:${long}`);
  }
}

export default {getYrForecast};