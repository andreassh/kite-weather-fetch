import {jest} from "@jest/globals";

import fetchMock from "./mocks/fetch";
import { dummyFcooForecastInput, dummyFcooSpotData } from "./dummyData/fcoo";
import dummyYrSpotData, { dummyYrForecastInput } from "./dummyData/yr";
import { convertYrForecastToInputs } from "../src/utils/yr";
import { convertFcooForecastToInputs } from "../src/utils/fcoo";
import { dummySpots } from "./dummyData/spot";

jest.unstable_mockModule("../src/services/fetch", () => fetchMock);

// Tests

describe("Testing fetch of forecasts", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('it should be able to fetch FCOO forecast data', async () => {
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

  test('it should be able to fetch YR forecast data', async () => {
    const yrService = await import("../src/services/yr");
    const fetchService = await import("../src/services/fetch");

    const lat = 55.821392;
    const long = 11.937256;

    jest.spyOn(fetchService, "fetch").mockResolvedValue({status: 200, json: () => Promise.resolve(dummyYrSpotData)} as Response);
    
    const result = await yrService.getYrForecast(lat, long);

    expect(fetchService.fetch).toHaveBeenCalledWith(
      `https://api.met.no/weatherapi/locationforecast/2.0/?lat=${lat.toFixed(
        4
      )}&lon=${long.toFixed(4)}`,
      {
        headers: {
          'User-Agent': 'tuna.digital contact@tuna.digital',
        },
      }
    );
    expect(result).toEqual(dummyYrSpotData);
  });
  
  test('it should be able to fetch Spots', async () => {
    const spotService = await import("../src/services/spot");
    const fetchService = await import("../src/services/fetch");

    jest.spyOn(fetchService, "fetch").mockResolvedValue({status: 200, json: () => Promise.resolve({data: {spots: {data: dummySpots}}})} as Response);
    
    const result = await spotService.getSpots();

    expect(fetchService.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(dummySpots);
  });

  it('it should convert YRForecastData to YrForecastInput', () => {
    const conversion = convertYrForecastToInputs(dummyYrSpotData);
    expect(conversion[0]).toEqual(dummyYrForecastInput);
  });

  it('it should convert FcooForecastData to FcooForecastInput', () => {
    const conversion = convertFcooForecastToInputs(dummyFcooSpotData);
    expect(conversion[0]).toEqual(dummyFcooForecastInput);
  });

  test('it should be able to create or update an yr forecast', async () => {
    const yrForecastService = await import("../src/services/yrForecast");
    const fetchService = await import("../src/services/fetch");

    // mocking GraphQL response
    jest.spyOn(fetchService, "fetch").mockResolvedValue({ status: 200, json: () => Promise.resolve({
      data: {
        createYrForecast: {
          data: {
            id: "1"
          }
        }
      }
    })} as Response);
    const result = await yrForecastService.createOrUpdateYrForecast(dummyYrForecastInput);

    // fetch should be called twice. Once to find out if record exits and once to create record.
    expect(fetchService.fetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual("1");
  });

  test('it should be able to create or update an fcoo forecast', async () => {
    const fcooForecastService = await import("../src/services/fcooForecast");
    const fetchService = await import("../src/services/fetch");

    // mocking GraphQL response
    jest.spyOn(fetchService, "fetch").mockResolvedValue({ status: 200, json: () => Promise.resolve({
      data: {
        createFcooForecast: {
          data: {
            id: "1"
          }
        }
      }
    })} as Response);
    const result = await fcooForecastService.createOrUpdateFcooForecast(dummyFcooForecastInput);

    // fetch should be called twice. Once to find out if record exits and once to create record.
    expect(fetchService.fetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual("1");
  });

  test("it should be able to fetch af save all forecasts", async () => {
    /* await import("../src/services/spot");
    await import("../src/services/fcooForecast");
    await import("../src/services/yrForecast"); */
    const jobs = await import("../src/jobs");
    const fetchService = await import("../src/services/fetch");

    TODO: fixe tests

    jest.spyOn(fetchService, "fetch").mockImplementation(async (url, init) => {
      console.log('mocking fetch to url:', url);
      return {status: 200, json: () => Promise.resolve({data: {spots: {data: dummySpots}}})} as Response;
    });

    const jobRes = await jobs.fetchForecast({body:{}, headers:{}});


    expect(jobRes === true);
  });
});
