import { gql } from "@apollo/client/core/index.js";
import { YrForecastEntityResponse, YrForecastInput } from "../../types-kite-app/dist/es/Types";
import client from "../client";

export const YR_FORECAST_FIELDS = gql`
  fragment SpotFields on SpotEntity  {
    id
    attributes {
      name
      lat
      long
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

export const createYrForecast = async (params: YrForecastInput):Promise<string|number|undefined|null> => {
  // TODO: create a update or create if has entry with same timestamp
  console.log('createYrForecast from params', params);
  const { data } = await client.mutate<{createYrForecast: YrForecastEntityResponse}>({
    mutation: CREATE_YR_FORECAST,
    variables: {
      data: params
    }
  });

  return data?.createYrForecast?.data?.id;
}

export default {createYrForecast};