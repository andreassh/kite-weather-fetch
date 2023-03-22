import { YrForecastInput } from "../../types-kite-app/dist/es/Types";
import fetch from 'cross-fetch';
import dotenv from "dotenv";
import errorHandler from "../errorHandler";
import { delay } from "../utils/utils";

dotenv.config();

const apiUrl = process.env.YR_API_URL;

interface YRForecastTimeseries {
  time: string
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number,
        air_temperature: number,
        air_temperature_percentile_10: number,
        air_temperature_percentile_90: number,
        cloud_area_fraction: number,
        cloud_area_fraction_high: number,
        cloud_area_fraction_low: number,
        cloud_area_fraction_medium: number,
        dew_point_temperature: number,
        fog_area_fraction: number,
        relative_humidity: number,
        ultraviolet_index_clear_sky: number,
        wind_from_direction: number,
        wind_speed: number,
        wind_speed_of_gust: number,
        wind_speed_percentile_10: number,
        wind_speed_percentile_90: number,
      }
    },
    next_12_hours: {
      summary: {
        symbol_code: string,
        symbol_confidence: string
      },
      details: {
        probability_of_precipitation: number,
      }
    },
    next_1_hours: {
      summary: {
        symbol_code: string,
      },
      details: {
        precipitation_amount: number,
        precipitation_amount_max: number,
        precipitation_amount_min: number,
        probability_of_precipitation: number,
        probability_of_thunder: number,
      }
    },
    next_6_hours: {
      summary: {
        symbol_code: string,
      },
      details: {
        air_temperature_max: number,
        air_temperature_min: number,
        precipitation_amount: number,
        precipitation_amount_max: number,
        precipitation_amount_min: number,
        probability_of_precipitation: number,
      }
    }
  }
}

export interface YRForecastData {
  type: string,
  geometry: {
      type: string,
      coordinates: number[]
  },
  properties: {
    meta: {
      updated_at: string,
      units: {
        air_pressure_at_sea_level: string,
        air_temperature:  string,
        air_temperature_max:  string,
        air_temperature_min:  string,
        air_temperature_percentile_10: string,
        air_temperature_percentile_90: string,
        cloud_area_fraction: string,
        cloud_area_fraction_high: string,
        cloud_area_fraction_low: string,
        cloud_area_fraction_medium: string,
        dew_point_temperature: string,
        fog_area_fraction: string,
        precipitation_amount: string,
        precipitation_amount_max: string,
        precipitation_amount_min: string,
        probability_of_precipitation: string,
        probability_of_thunder: string,
        relative_humidity: string,
        ultraviolet_index_clear_sky: string,
        wind_from_direction: string,
        wind_speed: string,
        wind_speed_of_gust: string,
        wind_speed_percentile_10: string,
        wind_speed_percentile_90: string,
      }
    },
    timeseries: YRForecastTimeseries[],
  }
}

export const getYrForecast = async (lat:number, long:number):Promise<YRForecastData> => {

  // NOTE: we must not do this request to often (max 20/s), and not use over 4 decimals for lat,long. otherwise we receive 403
  // https://developer.yr.no/doc/TermsOfService/

  const url = `${apiUrl}/?lat=${lat.toFixed(4)}&lon=${long.toFixed(4)}`;

  try {
    console.log('fetching url', url);
    const res = await fetch(url,{
      headers: {
        "User-Agent": "tuna.digital contact@tuna.digital"
      }
    });
    let data:YRForecastData;
    if (res.status === 200) {
      data = await res.json();
    } else {
      console.log('error res: ', res);
      errorHandler(`Error fetching YR data with url ${url}. status is: ${res.status}: ${res.statusText}`);
    }

    await delay(50); // need to add delay between every request to YR
    return data;
  } catch (err) {
    console.error(err);
    errorHandler(`Error fetching YR data for spot with coordinates lat: ${lat}, long:${long}`);
  }
}

export default {getYrForecast};