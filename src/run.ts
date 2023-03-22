import dotenv from "dotenv";
import { SpotEntity } from "../types-kite-app/dist/es/Types";
import errorHandler from "./errorHandler";
import getSpots from "./services/spot";
import { getYrForecast, YRForecastData } from "./services/yr";
import { createYrForecast } from "./services/yrForecast";
import { convertYrForecastToInputs } from "./utils/yr";

dotenv.config();

export interface RunProps {
  body: any;
  headers: any;
}

export const processSpot = async (spot: SpotEntity) => {
  let yrForecast: YRForecastData;
  try{
    yrForecast = await getYrForecast(spot.attributes.lat, spot.attributes.long);
  } catch(err) {
    console.error(err);
    errorHandler("Failed to fetch spot data from spot", spot.attributes.name);
  }

  // covert data to yr forecast inputs
  const timeseries = convertYrForecastToInputs(yrForecast);
  // loop everty spot data entitiy to save info
  for(let i=0;i<timeseries.length;i++) {
    try {
      await createYrForecast(timeseries[i]);
    } catch(err) {
      console.log("Failed to create YR forecast entry:");
      console.error(err);
    }
  }
}

export const run = async (req?:RunProps):Promise<boolean> => {
  const params = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  console.log("Running job from params", params);

  let spots:SpotEntity[] = [];
  // get all spots.
  try {
    spots = await getSpots();
  } catch(err) {
    console.error(err);
    errorHandler("Failed to fetch spots");
  }

  // for each spot, get forecast
  for (let i=0; i<spots.length;i++) {
    await processSpot(spots[i]);
  }

  // returning dummy promise for now
  return await new Promise((res) => res(true));
};

export default {run};
