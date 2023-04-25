import { SpotEntity } from "../../types-kite-app/dist/es/Types";
import { Enum_Componentspottrafficlight_Value } from "../../types-kite-app/src/Types";

export const dummySpot1: SpotEntity = {
  attributes: {
    name: "Mocked Spot name",
    description: "Mocked Spot description",
    lat: 91.111,
    long: 56.111,
    wind_direction: {
      "id": "1",
      "N": {
        id: "1",
        value: Enum_Componentspottrafficlight_Value.Yellow,
      },
      "NE": {
        id: "2",
        value: Enum_Componentspottrafficlight_Value.Yellow
      },
      "E": {
        id: "3",
        value: Enum_Componentspottrafficlight_Value.Red
      },
      "SE": {
        id: "4",
        value: Enum_Componentspottrafficlight_Value.Red
      },
      "S": {
        id: "5",
        value: Enum_Componentspottrafficlight_Value.Red
      },
      "SW": {
        id: "6",
        value: Enum_Componentspottrafficlight_Value.Green
      },
      "W": {
        id: "7",
        value: Enum_Componentspottrafficlight_Value.Green
      },
      "NW": {
        id: "8",
        value: Enum_Componentspottrafficlight_Value.Green
      }
    }
  } 
}
export const dummySpot2: SpotEntity = {
  attributes: {
    name: "Mocked Spot 2 name",
    description: "Mocked Spot 2 description",
    lat: 91.222,
    long: 56.222,
    wind_direction: {
      "id": "2",
      "N": {
        id: "1",
        value: Enum_Componentspottrafficlight_Value.Red,
      },
      "NE": {
        id: "2",
        value: Enum_Componentspottrafficlight_Value.Red
      },
      "E": {
        id: "3",
        value: Enum_Componentspottrafficlight_Value.Red
      },
      "SE": {
        id: "4",
        value: Enum_Componentspottrafficlight_Value.Yellow
      },
      "S": {
        id: "5",
        value: Enum_Componentspottrafficlight_Value.Green
      },
      "SW": {
        id: "6",
        value: Enum_Componentspottrafficlight_Value.Green
      },
      "W": {
        id: "7",
        value: Enum_Componentspottrafficlight_Value.Green
      },
      "NW": {
        id: "8",
        value: Enum_Componentspottrafficlight_Value.Yellow
      }
    }
  } 
}

export const dummySpots:SpotEntity[] = [dummySpot1, dummySpot2];
