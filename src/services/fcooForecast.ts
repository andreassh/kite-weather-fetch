import {FcooForecastInput} from "../../types-kite-app/dist/es/Types";
import errorHandler from "../errorHandler";
import { getApiUrl, getDefaultApiHeaders } from "./api";
import { fetch } from "./fetch";

type EntryID = string|number|undefined|null;


export const GET_FCOO_FORECAST = `
  query GetFcooForecast($unique_constraint: String) {
    fcooForecasts(pagination: {limit:1} filters:{unique_constraint:{eq: $unique_constraint}}) {
      data{
        id
      }
    }
  }
`;

export const CREATE_FCOO_FORECAST = `
  mutation CreateForecast( $data: FcooForecastInput!) {
    createFcooForecast(data: $data) {
      data {
        id
      }
    }
  }
`


export const UPDATE_FCOO_FORECAST = `
  mutation UpdateForecast( 
    $id: ID! 
    $data: FcooForecastInput!) {
    updateFcooForecast(
      id: $id,
      data: $data
    ) {
      data {
        id
      }
    }
  }
`



export const doesFcooForecastExist = async (unique_constraint: string):Promise<EntryID> => {
  /**
   * Return string or number of entry ID if entry exists
  */
  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: GET_FCOO_FORECAST,
        variables: {
          unique_constraint
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error getting fcoo forecast entry from unique_constraint: ${unique_constraint}`);
    }
    return data?.fcooForecasts?.data.length ? data?.fcooForecasts.data[0].id : null;
  } catch (err) {
    console.error(err);
    errorHandler(`Error getting fcoo forecast entry from unique_constraint: ${unique_constraint}`);
  }
}

export const createFcooForecast = async (params: FcooForecastInput):Promise<EntryID> => {
  console.log('create FcooForecast with timestamp', params.timestamp);
  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: CREATE_FCOO_FORECAST,
        variables: {
          data: params
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error creating FCOO forecast from params: ${params}`);
    }
    return data?.createFcooForecast?.data?.id;
  }  catch (err) {
    console.error(err);
    errorHandler(`Error creating FCOO forecast from params: ${params}`);
  }
}

export const updateFcooForecast = async (id: string|number, params: FcooForecastInput):Promise<EntryID> => {
  console.log('update FcooForecast with timestamp', params.timestamp);
  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: UPDATE_FCOO_FORECAST,
        variables: {
          id, 
          data: params
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error updating FCOO forecast from id: ${id} and params: ${params}`);
    }
    return data?.updateFcooForeCast?.data?.id;
  }  catch (err) {
    console.error(err);
    errorHandler(`Error updating FCOO forecast from id: ${id} and params: ${params}`);
  }
}

export const createOrUpdateFcooForecast = async (params: FcooForecastInput):Promise<EntryID> => {
  const forecastId = await doesFcooForecastExist(params.unique_constraint);
  return forecastId ? updateFcooForecast(forecastId, params) : createFcooForecast(params);
}


export default {createFcooForecast,updateFcooForecast,createOrUpdateFcooForecast};