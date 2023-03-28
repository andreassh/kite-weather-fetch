import {jest} from "@jest/globals";

import { spotServiceMock } from "./mocks/spot";
import fetchMock from "./mocks/fetch";
import { dummyFcooSpotData } from "./dummyData/fcoo";

jest.unstable_mockModule("../src/services/spot", () => spotServiceMock);
jest.unstable_mockModule("../src/services/fetch", () => fetchMock);


// can we use this??? 
/* jest.mock('cross-fetch', () => {
  //Mock the default export
  return {
    __esModule: true,
    default: jest.fn((url:string, params: any):{status:number, json: () => FcooForecastData} => {
      console.log('CALLING MOCK FETCH!');
      return {
        status: 200,
        json: () => dummyFcooSpotData,
      };
    })
  };
}); */

// Tests

describe("testing process order", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('it should fetch FCOO data', async () => {
    const fcooService = await import("../src/services/fcoo");
    const fetchService = await import("../src/services/fetch");

    const lat = 55.821392;
    const long = 11.937256;

    jest.spyOn(fetchService, "fetch").mockResolvedValue({status: 200, json: () => Promise.resolve(dummyFcooSpotData)} as Response);
    
    const result = await fcooService.getFcooForecast(lat, long);

    expect(fetchService.fetch).toHaveBeenCalledWith(
      `https://app.fcoo.dk/metoc/v2/data/timeseries?variables=Wind,WindSpeed,Precipitation,AirTemperature&lat=${lat.toFixed(
        4
      )}&lon=${long.toFixed(4)}`,
      {
        headers: {
          'User-Agent': 'tuna.digital contact@tuna.digital',
        },
      }
    );
    expect(result).toEqual(dummyFcooSpotData);
  });

  /* test("testing fetch forecast", async () => {
    const jobs = await import("../src/jobs");
    const jobRes = await jobs.fetchForecast({body:jobExample, headers:{}});
    expect(jobRes === true);
  }); */
});
