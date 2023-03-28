import { SpotEntity } from "../../types-kite-app/dist/es/Types";
import {dummySpots} from "../dummyData/spot";

import {jest} from "@jest/globals";

export const spotServiceMock = ({
  getSpots: jest.fn(():SpotEntity[] => {
    return dummySpots;
  })
})

export default spotServiceMock;