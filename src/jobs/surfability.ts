import { ComponentForecastForecast, SpotEntity, YrForecast } from "../../types-kite-app/dist/es/Types";

export type Surfable = {
  beginner: boolean;
  intermediate: boolean;
  advanced: boolean;
}

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
export const calcWindDirSurfA = (spot:SpotEntity, initSurfA=defaultSurfability):Surfable => {

  const surfA = {...initSurfA};

  // TODO: set surfability according to wind direction....
  
  return {
    beginner: false,
    intermediate: false,
    advanced: false,
  }

  return surfA;
}


export const surfability = (spot:SpotEntity, forecast: ComponentForecastForecast):Surfable => {

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
  surfA = calcWindDirSurfA(spot, surfA);
  
  // TODO: make check for gusty wind

  return surfA;
}

export default {
  surfability, 
  calcThunderSurfA,
  thunderThres,
  thunderBeginnerThres,
  calcWindSurfA,
  windThres,
  windBeginnerMax,
  calcRainSurfA,
  precipationThres
};