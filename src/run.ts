import dotenv from "dotenv";
import { SpotEntity } from "../types-kite-app/dist/es/Types";
import errorHandler from "./errorHandler";
import getSpots from "./services/spot";
import { getYrForecast } from "./services/yr";
import { createYrForecast } from "./services/yrForecast";

dotenv.config();

export interface RunProps {
  body: any;
  headers: any;
}

export const processSpot = async (spot: SpotEntity) => {
  try {
    let data = await getYrForecast(spot.attributes.lat, spot.attributes.long);
    // loop everty spot data entitiy to save info
    for(let i=0;i<data.length;i++) {
      await createYrForecast(data[i]);
    }
  } catch(err) {
    console.error(err);
    errorHandler("Failed to fetch spot data from spot", spot.attributes.name);
  }
}

export const run = async (req?:RunProps):Promise<boolean> => {
  console.log("Running job from req.body", req?.body);

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
    spots.forEach(async (s) => processSpot(s))
  }

  // returning dummy promise for now
  return await new Promise((res) => res(true));
};

export default {run};
