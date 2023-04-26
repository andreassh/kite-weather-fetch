import dotenv from "dotenv";
import { ComponentForecastForecast, Enum_Componentspottrafficlight_Value, SpotEntity, YrForecast, YrForecastEntity } from "../../types-kite-app/dist/es/Types";
import errorHandler from "../errorHandler";
import getSpots from "../services/spot";
import { getYrForecasts } from "../services/yrForecast";
import { createOrUpdateSpotSurfability } from "../services/spotSurfability";

export type Surfable = {
  beginner: boolean;
  intermediate: boolean;
  advanced: boolean;
}

/* export type Surfable = ComponentForecastSurfable & {} */


dotenv.config();
/** 
 * Thresholds
 * 
 * Used for surfability calcuations. Tweak these to adjust when a spot is surfable or not
 * 
 * **/

const defaultSurfability = {
  beginner: true,
  intermediate: true,
  advanced: true,
}

export interface RunProps {
  body: any;
  headers: any;
}

export const thunderThres = parseFloat(process.env.THUNDER_THRES)||0.4;
export const thunderBeginnerThres = parseFloat(process.env.THUNDER_BEGINNER_THRES)||0.3;
export const windThres = parseFloat(process.env.WIND_THRES)||5.0;
export const windBeginnerMax = parseFloat(process.env.WIND_BEGINNER_MAX)||12;
export const precipationThres = parseFloat(process.env.PRECIPATION_THRES)||50;

export const calcThunderSurfA = (propablity:number, initSurfA=defaultSurfability):Surfable => {

  let surfA = {...initSurfA};

  if (propablity > thunderThres) {
    return {
      beginner: false,
      intermediate: false,
      advanced: false,
    }
  } else if (propablity > thunderBeginnerThres) {
    surfA.beginner = false;
  }
  return surfA;
}

export const calcWindSurfA = (windspeed:number, initSurfA=defaultSurfability):Surfable => {

  const surfA = {...initSurfA};

  if (windspeed < windThres) {
    surfA.beginner=false;
    surfA.intermediate=false;
    surfA.advanced=false;
  } else if (windspeed > windBeginnerMax) {
    surfA.beginner=false;
  }

  return surfA;
}

export const calcRainSurfA = (precipationProp:number, initSurfA=defaultSurfability):Surfable => {

  const surfA = {...initSurfA};

  if (precipationProp > precipationThres) {
    surfA.beginner=false;
  }

  return surfA;
}


// TODO: change spot input to simpler form (wind dir data)
export const calcWindDirSurfA = (windDirColor: Enum_Componentspottrafficlight_Value, initSurfA=defaultSurfability):Surfable => {

  const surfA = {...initSurfA};

  if (windDirColor !== Enum_Componentspottrafficlight_Value.Green){
    surfA.beginner = false;
  }
  if (windDirColor === Enum_Componentspottrafficlight_Value.Red){
    surfA.intermediate = false;
    surfA.advanced = false;
  }

  return surfA;
}


export const spotSurfability = (spot:SpotEntity, forecast: ComponentForecastForecast):Surfable => {

  /**
   * Surfability takes a spot and a forecast as inputs and determines if a spot is surfable from the forecast data.
   * In initial state a spot is surfable, unless a place in the functions sets state to be non-surfable (level = false). 
   * Hence, if you set surfability state to true for a level at some point in this function, you've done something wrong.
   * Should always just disable.
   **/

  let surfA = defaultSurfability;
  
  /**
   * Check for thunder. 
   * If propablity to high, return not surfable for all levels
   *  */ 
  surfA = calcThunderSurfA(forecast.probability_of_thunder, surfA);
  
  /**
   * Check for wind speed. 
   * should be above threshold or below beginner max
   *  */ 
  surfA = calcWindSurfA(forecast.wind_speed, surfA);

  
  /**
   * Check for rain.
   * Precipations should be below threshold for beginners
   *  */ 
  surfA = calcRainSurfA(forecast.probability_of_precipitation, surfA);
  
  /**
   * Check for wind direction
   * Should match directions for spot and level
   *  */ 
  surfA = calcWindDirSurfA(spot.attributes.wind_direction[forecast.wind_direction]?.value, surfA);
  
  // TODO: make check for gusty wind

  return surfA;
}

export const processForeCast = async (spot:SpotEntity, forecast:YrForecastEntity):Promise<boolean> => {
  const surfA = spotSurfability(spot, forecast.attributes.forecast);

  // TODO: surfable should be more granular. Right now only true false. Should be traffic light
  const params = {
    spot: spot.id,
    surfable: {
      beginner: { value: surfA.beginner ? Enum_Componentspottrafficlight_Value.Green : Enum_Componentspottrafficlight_Value.Red},
      intermediate: { value: surfA.intermediate ? Enum_Componentspottrafficlight_Value.Green : Enum_Componentspottrafficlight_Value.Red},
      advanced: { value: surfA.advanced ? Enum_Componentspottrafficlight_Value.Green : Enum_Componentspottrafficlight_Value.Red}
    },
    time: forecast.attributes.timestamp,
    yr_forecast: forecast.id,
    unique_constraint: `${spot.id}_${forecast.attributes.timestamp}`,
  }

  try {
    await createOrUpdateSpotSurfability(params);
  } catch (err) {
    console.error("Error creating surability for spot", spot.id);
  }

  return true;
}

export const processSpot = async (spot:SpotEntity) => {
  let forecasts:YrForecastEntity[] = [];
  
  try {
    forecasts = await getYrForecasts(spot.id, new Date().toISOString());
  } catch (err) {
    console.error(err);
    errorHandler("Failed to fetch spots");
  }

  for (let i=0; i<forecasts.length;i++) {
    console.log('processing forecast', forecasts[i]);
    await processForeCast(spot, forecasts[i]);
  }
}


export const calcSurfability = async (req?:RunProps):Promise<boolean> => {
  let params = {};
  if (req?.body) {
    params = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }
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
  console.log('Successfully finished calculating surfability for all Spots')
  return await new Promise((res) => res(true));
};

export default {
  calcSurfability,
  spotSurfability, 
  calcThunderSurfA,
  thunderThres,
  thunderBeginnerThres,
  calcWindSurfA,
  windThres,
  windBeginnerMax,
  calcRainSurfA,
  precipationThres,
  calcWindDirSurfA
};