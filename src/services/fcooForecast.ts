import { gql } from "@apollo/client/core/index.js";
import { FcooForecastEntityResponseCollection, FcooForecastInput, YrForecastEntityResponse, YrForecastEntityResponseCollection, YrForecastInput } from "../../types-kite-app/dist/es/Types";
import { FcooForecastEntityResponse } from "../../types-kite-app/src/Types";
import client from "../client";

type EntryID = string|number|undefined|null;


export const GET_FCOO_FORECAST = gql`
  query GetFcooForecast($unique_constraint: String) {
    fcooForecasts(pagination: {limit:1} filters:{unique_constraint:{eq: $unique_constraint}}) {
      data{
        id
      }
    }
  }
`;

export const CREATE_FCOO_FORECAST = gql`
  mutation CreateForecast( $data: FcooForecastInput!) {
    createFcooForecast(data: $data) {
      data {
        id
      }
    }
  }
`


export const UPDATE_FCOO_FORECAST = gql`
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
  const { data } = await client.query<{fcooForecasts: FcooForecastEntityResponseCollection}>({
    query: GET_FCOO_FORECAST,
    fetchPolicy: 'no-cache',
    variables: {
      unique_constraint
    }
  });

  return data?.fcooForecasts?.data.length ? data.fcooForecasts.data[0].id : null;
}

export const createFcooForecast = async (params: FcooForecastInput):Promise<EntryID> => {
  // TODO: create a update or create if has entry with same timestamp
  console.log('create FcooForecast with timestamp', params.timestamp);
  const { data } = await client.mutate<{createFcooForecast: FcooForecastEntityResponse}>({
    mutation: CREATE_FCOO_FORECAST,
    variables: {
      data: params
    }
  });

  return data?.createFcooForecast?.data?.id;
}

export const updateFcooForecast = async (id: string|number, params: FcooForecastInput):Promise<EntryID> => {
  console.log('update FcooForecast with timestamp', params.timestamp);
  const { data } = await client.mutate<{updateFcooForeCast: FcooForecastEntityResponse}>({
    mutation: UPDATE_FCOO_FORECAST,
    variables: {
      id, 
      data: params
    }
  });

  return data?.updateFcooForeCast?.data?.id;
}

export const createOrUpdateFcooForecast = async (params: YrForecastInput):Promise<EntryID> => {
  const forecastId = await doesFcooForecastExist(params.unique_constraint);
  return forecastId ? updateFcooForecast(forecastId, params) : createFcooForecast(params);
}


export default {createFcooForecast,updateFcooForecast,createOrUpdateFcooForecast};