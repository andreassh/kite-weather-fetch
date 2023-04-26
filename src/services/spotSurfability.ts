import {SpotSurfabilityInput} from "../../types-kite-app/dist/es/Types";
import errorHandler from "../errorHandler";
import { getApiUrl, getDefaultApiHeaders } from "./api";
import { fetch } from "./fetch";

type EntryID = string|number|undefined|null;


export const GET_QUERY = `
  query GetSpotSurfability($unique_constraint: String) {
    spotSurfabilities(pagination: {limit:1} filters:{unique_constraint:{eq: $unique_constraint}}) {
      data{
        id
      }
    }
  }
`;

export const CREATE_QUERY = `
  mutation CreateSpotSurfability( $data: SpotSurfabilityInput!) {
    createSpotSurfability(data: $data) {
      data {
        id
      }
    }
  }
`


export const UPDATE_QUERY = `
  mutation UpdateSpotSurfability( 
    $id: ID! 
    $data: SpotSurfabilityInput!) {
    updateSpotSurfability(
      id: $id,
      data: $data
    ) {
      data {
        id
      }
    }
  }
`



export const doesSpotSurfabilityExist = async (unique_constraint: string):Promise<EntryID> => {
  /**
   * Return string or number of entry ID if entry exists
  */
  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: GET_QUERY,
        variables: {
          unique_constraint
        }
      }),
    });
    const {data, errors} = await res.json();
    if (errors) {
      console.error(errors);
      errorHandler(`Error getting SpotSurfability entry from unique_constraint: ${unique_constraint}`);
    }
    return data?.spotSurfabilities?.data.length ? data?.spotSurfabilities.data[0].id : null;
  } catch (err) {
    console.error(err);
    errorHandler(`Error getting SpotSurfability entry from unique_constraint: ${unique_constraint}`);
  }
}

export const createSpotSurfability = async (params: SpotSurfabilityInput):Promise<EntryID> => {
  try {
    console.log('create spot surfability with params', params);
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: CREATE_QUERY,
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

export const updateSpotSurfability = async (id: string|number, params: SpotSurfabilityInput):Promise<EntryID> => {
  try {
    const res = await fetch(getApiUrl(), {
      method: 'POST',
      headers: getDefaultApiHeaders(),
      body: JSON.stringify({
        query: UPDATE_QUERY,
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

export const createOrUpdateSpotSurfability = async (params: SpotSurfabilityInput):Promise<EntryID> => { 
  const id = await doesSpotSurfabilityExist(params.unique_constraint);
  return id ? updateSpotSurfability(id, params) : createSpotSurfability(params);
}


export default {createSpotSurfability,updateSpotSurfability,createOrUpdateSpotSurfability};