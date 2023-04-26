import { YrForecast, YrForecastEntity, YrForecastInput } from "../../types-kite-app/dist/es/Types";
import errorHandler from "../errorHandler";
import { getApiUrl, getDefaultApiHeaders } from "./api";
import { fetch } from "./fetch";

type EntryID = string|number|undefined|null;


export const YR_FORECAST_FIELDS = `
  fragment YRForecastFields on YrForecastEntity {
    id
    attributes {
      timestamp
      forecast {
        wind_from_direction
        wind_speed
        wind_speed_of_gust
        probability_of_thunder
        probability_of_precipitation
        air_temperature
        symbol
        symbol_code
        symbol_confidence
        wind_direction
      }
    }
  }
`;

export const GET_YR_FORECAST = `
  query GetYrForecast($unique_constraint: String) {
    yrForecasts(pagination: {limit:1} filters:{unique_constraint:{eq: $unique_constraint}}) {
      data{
        id
      }
    }
  }
`;

export const GET_YR_FORECASTS = `
  ${YR_FORECAST_FIELDS}
  query GetYrForecast($spotId: ID!, $startDate: DateTime, $limit: Int = 1000) {
    yrForecasts(
      pagination: {limit:$limit} 
      filters:{
        timestamp: {gt: $startDate}
        spot:{ 
          id:{eq: $spotId}
        }
      }) {
      data{
        ...YRForecastFields
      }
    }
  }
`;

export const CREATE_YR_FORECAST = `
  mutation CreateForecast( $data: YrForecastInput!) {
    createYrForecast(data: $data) {
      data {
        id
      }
    }
  }
`


export const UPDATE_YR_FORECAST = `
  mutation UpdateForecast( 
    $id: ID! 
    $data: YrForecastInput!) {
    updateYrForecast(
      id: $id,
      data: $data
    ) {
      data {
        id
      }
    }
  }
`

export const getYrForecasts = async (spotId:number|string, startDate?:string):Promise<YrForecastEntity[]> => {
  /**
   * Return string or number of entry ID if entry exists
  */

  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: GET_YR_FORECASTS,
        variables: {
          spotId,
          startDate
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error getting yr forecasts`);
    }
    return data?.yrForecasts.data.length ? data?.yrForecasts.data : null;
  } catch (err) {
    console.error(err);
    errorHandler(`Error getting yr forecasts`);
  }
}


export const doesYrForecastExist = async (unique_constraint: string):Promise<EntryID> => {
  /**
   * Return string or number of entry ID if entry exists
  */

  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: GET_YR_FORECAST,
        variables: {
          unique_constraint
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error getting yr forecast entry from unique_constraint: ${unique_constraint}`);
    }
    return data?.yrForecasts?.data.length ? data?.yrForecasts.data[0].id : null;
  } catch (err) {
    console.error(err);
    errorHandler(`Error getting yr forecast entry from unique_constraint: ${unique_constraint}`);
  }
}

export const createYrForecast = async (params: YrForecastInput):Promise<EntryID> => {
  // console.log('create YrForecast with timestamp', params.timestamp);

  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: CREATE_YR_FORECAST,
        variables: {
          data: params
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error creating YR forecast from params: ${params}`);
    }
    return data?.createYrForecast?.data?.id;
  }  catch (err) {
    console.error(err);
    errorHandler(`Error creating YR forecast from params: ${params}`);
  }

}

export const updateYrForecast = async (id: string|number, params: YrForecastInput):Promise<EntryID> => {
  console.log('update YrForecast with timestamp', params.timestamp, 'and id', id);
  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: UPDATE_YR_FORECAST,
        variables: {
          id, 
          data: params
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error updating YR forecast from id: ${id} and params: ${params}`);
    }
    return data?.updateYrForeCast?.data?.id;
  }  catch (err) {
    console.error(err);
    errorHandler(`Error updating YR forecast from id: ${id} and params: ${params}`);
  }
}

export const createOrUpdateYrForecast = async (params: YrForecastInput):Promise<EntryID> => {
  const forecastId = await doesYrForecastExist(params.unique_constraint);
  return forecastId ? updateYrForecast(forecastId, params) : createYrForecast(params);
}


export default {createYrForecast,updateYrForecast,createOrUpdateYrForecast};