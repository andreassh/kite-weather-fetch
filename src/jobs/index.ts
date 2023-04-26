import * as fetchForecastJobs from "./fetchForecast";
import * as surfabilityJobs from "./surfability";

export const fetchForecast = fetchForecastJobs.fetchForecast;
export const calcSurfability = surfabilityJobs.calcSurfability;

export default {fetchForecast,calcSurfability};