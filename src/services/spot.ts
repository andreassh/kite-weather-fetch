import { SpotEntity } from "../../types-kite-app/dist/es/Types";
import errorHandler from "../errorHandler";
import { getApiUrl, getDefaultApiHeaders } from "./api";
import { fetch } from "./fetch";

export const SPOT_FIELDS = `
  fragment SpotFields on SpotEntity  {
    id
    attributes {
      name
      lat
      long
    }
  }
`;

export const GET_SPOTS = `
  ${SPOT_FIELDS}
  query GetSpots {
    spots(pagination: {pageSize: 10000}){
      data {
        ...SpotFields
      }
    }
  }
`;

export const getSpots = async ():Promise<SpotEntity[]> => {

  // use this error message if something goeds wrong
  const defaultErrMsg = `Error getting spots`;

  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: GET_SPOTS,
      }),
    });
    console.log('got from fetch', res);
    const {data, errors} = await res.json();
    console.log('data is', data);
    if (errors) {
      console.error(errors);
      errorHandler(defaultErrMsg);
    }
    return data?.spots?.data;
  } catch (err) {
    console.error(err);
    errorHandler(defaultErrMsg);
  }
}

export default getSpots;