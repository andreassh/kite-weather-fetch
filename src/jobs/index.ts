import * as fetchForecastJobs from "./fetchForecast";
import * as surfabilityJobs from "./surfability";

export const fetchForecast = fetchForecastJobs.fetchForecast;
export const surfability = surfabilityJobs.surfability;

export default {fetchForecast,surfability};