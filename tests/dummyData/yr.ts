import { YRForecastData } from "../../src/services/yr";
import { Enum_Componentforecastforecast_Wind_Direction, YrForecastEntity, YrForecastInput } from "../../types-kite-app/dist/es/Types";

export const dummyYrForecastInput:YrForecastInput = {
  forecast: {
    air_temperature: 0,
    probability_of_precipitation: 0,
    probability_of_thunder: 0,
    symbol: "",
    symbol_code: '',
    symbol_confidence: '',
    wind_from_direction: 0,
    wind_speed: 0,
    wind_direction: Enum_Componentforecastforecast_Wind_Direction.N,
    wind_speed_of_gust: 0,
  },
  provider_updated_at: "2023-03-29T07:43:45Z",
  timestamp: '2023-03-29T07:43:45Z',
  spot: "1",
  unique_constraint: '2023-03-29T07:43:45Z_11.937355.82140',
}

const dummyYrSpotData: YRForecastData = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [
      11.9373,
      55.8214,
      0
    ]
  },
  properties: {
    meta: {
      "updated_at": "2023-03-29T07:43:45Z",
      "units": {
          "air_pressure_at_sea_level": "hPa",
          "air_temperature": "celsius",
          "air_temperature_max": "celsius",
          "air_temperature_min": "celsius",
          "air_temperature_percentile_10": "celsius",
          "air_temperature_percentile_90": "celsius",
          "cloud_area_fraction": "%",
          "cloud_area_fraction_high": "%",
          "cloud_area_fraction_low": "%",
          "cloud_area_fraction_medium": "%",
          "dew_point_temperature": "celsius",
          "fog_area_fraction": "%",
          "precipitation_amount": "mm",
          "precipitation_amount_max": "mm",
          "precipitation_amount_min": "mm",
          "probability_of_precipitation": "%",
          "probability_of_thunder": "%",
          "relative_humidity": "%",
          "ultraviolet_index_clear_sky": "1",
          "wind_from_direction": "degrees",
          "wind_speed": "m/s",
          "wind_speed_of_gust": "m/s",
          "wind_speed_percentile_10": "m/s",
          "wind_speed_percentile_90": "m/s"
      }
    },
    timeseries: [
      {
        time: '2023-03-29T07:43:45Z',
        data: {
          instant: {
            details: {
              air_pressure_at_sea_level: 0,
              air_temperature: 0,
              air_temperature_percentile_10: 0,
              air_temperature_percentile_90: 0,
              cloud_area_fraction: 0,
              cloud_area_fraction_high: 0,
              cloud_area_fraction_low: 0,
              cloud_area_fraction_medium: 0,
              dew_point_temperature: 0,
              fog_area_fraction: undefined,
              relative_humidity: 0,
              ultraviolet_index_clear_sky: undefined,
              wind_from_direction: 0,
              wind_speed: 0,
              wind_speed_of_gust: undefined,
              wind_speed_percentile_10: 0,
              wind_speed_percentile_90: 0,
            },
          },
          next_12_hours: {
            summary: {
              symbol_code: '',
              symbol_confidence: '',
            },
            details: {
              probability_of_precipitation: 0,
            },
          },
          next_1_hours: {
            summary: {
              symbol_code: '',
            },
            details: {
              precipitation_amount: 0,
              precipitation_amount_max: 0,
              precipitation_amount_min: 0,
              probability_of_precipitation: 0,
              probability_of_thunder: 0,
            },
          },
          next_6_hours: {
            summary: {
              symbol_code: '',
            },
            details: {
              air_temperature_max: 0,
              air_temperature_min: 0,
              precipitation_amount: 0,
              precipitation_amount_max: 0,
              precipitation_amount_min: 0,
              probability_of_precipitation: 0,
            },
          },
        },
      },
    ],
  },
};


export const dummyYrEntityBeginner: YrForecastEntity = {
  id: "1",
  attributes: {
    forecast: {
      air_temperature:15.0,
      id: "1",
      probability_of_precipitation: 14,
      probability_of_thunder: 0.2,
      symbol_code: "cloudy",
      symbol_confidence: "somewhat certain",
      wind_from_direction: 212.8,
      wind_direction: Enum_Componentforecastforecast_Wind_Direction.Sw,
      wind_speed: 7,
      wind_speed_of_gust: 9,
    },
    unique_constraint: "this_is_unique_1",
    uuid: "1",
  }
}

// example used for beginner nono, but intermediate and expert, jai jai woop woop
export const dummyYrEntityIntermediate: YrForecastEntity = {
  id: "2",
  attributes: {
    forecast: {
      air_temperature:15.0,
      id: "2",
      probability_of_precipitation: 14,
      probability_of_thunder: 0.2,
      symbol_code: "cloudy",
      symbol_confidence: "somewhat certain",
      wind_from_direction: 330.0,
      wind_direction: Enum_Componentforecastforecast_Wind_Direction.Nw,
      wind_speed: 7,
      wind_speed_of_gust: 9,
    },
    unique_constraint: "this_is_unique_2",
    uuid: "2",
  }
}

export default dummyYrSpotData;