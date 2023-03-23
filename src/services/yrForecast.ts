import { gql } from "@apollo/client/core/index.js";
import { YrForecastEntityResponse, YrForecastEntityResponseCollection, YrForecastInput } from "../../types-kite-app/dist/es/Types";
import client from "../client";

type EntryID = string|number|undefined|null;


export const GET_YR_FORECAST = gql`
  query GetYrForecast($unique_constraint: String) {
    yrForecasts(pagination: {limit:1} filters:{unique_constraint:{eq: $unique_constraint}}) {
      data{
        id
      }
    }
  }
`;

export const CREATE_YR_FORECAST = gql`
  mutation CreateForecast( $data: YrForecastInput!) {
    createYrForecast(data: $data) {
      data {
        id
      }
    }
  }
`


export const UPDATE_YR_FORECAST = gql`
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



export const doesYrForecastExist = async (unique_constraint: string):Promise<EntryID> => {
  /**
   * Return string or number of entry ID if entry exists
  */
  const { data } = await client.query<{yrForecasts: YrForecastEntityResponseCollection}>({
    query: GET_YR_FORECAST,
    fetchPolicy: 'no-cache',
    variables: {
      unique_constraint
    }
  });

  return data?.yrForecasts?.data.length ? data.yrForecasts.data[0].id : null;
}

export const createYrForecast = async (params: YrForecastInput):Promise<EntryID> => {
  console.log('create YrForecast with timestamp', params.timestamp);
  const { data } = await client.mutate<{createYrForecast: YrForecastEntityResponse}>({
    mutation: CREATE_YR_FORECAST,
    variables: {
      data: params
    }
  });

  return data?.createYrForecast?.data?.id;
}

export const updateYrForecast = async (id: string|number, params: YrForecastInput):Promise<EntryID> => {
  console.log('update YrForecast with timestamp', params.timestamp);
  const { data } = await client.mutate<{updateYrForeCast: YrForecastEntityResponse}>({
    mutation: UPDATE_YR_FORECAST,
    variables: {
      id, 
      data: params
    }
  });

  return data?.updateYrForeCast?.data?.id;
}

export const createOrUpdateYrForecast = async (params: YrForecastInput):Promise<EntryID> => {
  const forecastId = await doesYrForecastExist(params.unique_constraint);
  return forecastId ? updateYrForecast(forecastId, params) : createYrForecast(params);
}


export default {createYrForecast,updateYrForecast,createOrUpdateYrForecast};