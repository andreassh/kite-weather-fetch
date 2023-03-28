import { SpotEntity } from "../../types-kite-app/dist/es/Types";

export const dummySpot1: SpotEntity = {
  attributes: {
    name: "Mocked Spot name",
    description: "Mocked Spot description",
    lat: 91.111,
    long: 56.111
  } 
}
export const dummySpot2: SpotEntity = {
  attributes: {
    name: "Mocked Spot 2 name",
    description: "Mocked Spot 2 description",
    lat: 91.222,
    long: 56.222
  } 
}

export const dummySpots:SpotEntity[] = [dummySpot1, dummySpot2];
