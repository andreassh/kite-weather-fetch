import dotenv from "dotenv";
import errorHandler from "../errorHandler";
import { fetch } from "./fetch";

dotenv.config();

const apiUrl = process.env.FCOO_API_URL||"https://app.fcoo.dk/metoc/v2";
export type FcooForecastDataAttributes = {
  lat: number
  attributes: {
      units: string
      long_name: string
      missing_value: number
  },
  lon: number,
  data: number[],
  time: string[],
}

export type FcooForecastData = {
  Precipitation: {
      precip: FcooForecastDataAttributes
  },
  WindSpeed: {
      windspeed: FcooForecastDataAttributes
  },
  AirTemperature: {
      TMP: FcooForecastDataAttributes
  },
  Wind: {
      UGRD: FcooForecastDataAttributes,
      VGRD: FcooForecastDataAttributes
  }
}

export const getFcooForecast = async (lat:number, long:number):Promise<FcooForecastData> => {

  // NOTE: we must not do this request to often (max 20/s), and not use over 4 decimals for lat,long. otherwise we receive 403
  // https://developer.yr.no/doc/TermsOfService/

  const url = `${apiUrl}/data/timeseries?variables=Wind,WindSpeed,Precipitation,AirTemperature&lat=${lat.toFixed(4)}&lon=${long.toFixed(4)}`;

  try {
    // console.log('fetching url', url);
    const res = await fetch(url,{
      headers: {
        "User-Agent": "tuna.digital contact@tuna.digital"
      }
    });
    let data:FcooForecastData;
    if (res.status === 200) {
      data = await res.json();
    } else {
      console.log('error res: ', res);
      errorHandler(`Error fetching FCOO data with url ${url}. status is: ${res.status}: ${res.statusText}`);
    }
    return data;
  } catch (err) {
    console.error(err);
    errorHandler(`Error fetching FCOO data for spot with coordinates lat: ${lat}, long:${long}`);
  }
}

export default {getFcooForecast};