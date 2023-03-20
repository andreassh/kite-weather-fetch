import { gql } from "@apollo/client/core/index.js";
import { SpotEntity, SpotEntityResponseCollection } from "../../types-kite-app/dist/es/Types";
import client from "../client";

export const SPOT_FIELDS = gql`
  fragment SpotFields on SpotEntity  {
    id
    attributes {
      name
      lat
      long
    }
  }
`;

export const GET_SPOTS = gql`
  ${SPOT_FIELDS}
  query GetSpots {
    spots(pagination: {pageSize: 10000}){
      data {
        ...SpotFields
      }
    }
  }
`;

export const getSpots = async (token:string = ""):Promise<SpotEntity[]> => {
  const { data } = await client.query<{spots: SpotEntityResponseCollection}>({
    query: GET_SPOTS,
    fetchPolicy: 'no-cache',
    context: {
      token
    }
  });

  return data?.spots?.data;
}

export default getSpots;