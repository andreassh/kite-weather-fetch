import {jest} from "@jest/globals";
import surfability from "../src/jobs/surfability";
import { dummySpot1, dummySpot2 } from "./dummyData/spot";
import { dummyYrEntityBeginner, dummyYrEntityIntermediate } from "./dummyData/yr";
import { Enum_Componentspottrafficlight_Value } from "../types-kite-app/dist/es/Types";

// Tests

describe("Testing surfability calculations", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('it should be able to determine surfability from THUNDER propability', async () => {
    const notGoodRes = surfability.calcThunderSurfA(surfability.thunderThres + 0.2);
    expect(notGoodRes).toMatchObject({
      beginner: false,
      intermediate: false,
      advanced: false,
    });

    const allGoodRes = surfability.calcThunderSurfA(0);
    expect(allGoodRes).toMatchObject({
      beginner: true,
      intermediate: true,
      advanced: true,
    });

    const beginnerNoGoodRes = surfability.calcThunderSurfA(surfability.thunderBeginnerThres + 0.1);
    expect(beginnerNoGoodRes).toMatchObject({
      beginner: false,
      intermediate: true,
      advanced: true,
    });
  });

  test('it should be able to determine surfability from WIND speed', async () => {
    const notGoodRes = surfability.calcWindSurfA(surfability.windThres - 0.1);
    expect(notGoodRes).toMatchObject({
      beginner: false,
      intermediate: false,
      advanced: false,
    });

    const allGoodRes = surfability.calcWindSurfA(surfability.windThres);
    expect(allGoodRes).toMatchObject({
      beginner: true,
      intermediate: true,
      advanced: true,
    });

    const beginnerNoGoodRes = surfability.calcWindSurfA(surfability.windBeginnerMax + 0.1);
    expect(beginnerNoGoodRes).toMatchObject({
      beginner: false,
      intermediate: true,
      advanced: true,
    });
  });

  test('it should be able to determine surfability from PRECIPATION', async () => {
    const notGoodRes = surfability.calcRainSurfA(surfability.precipationThres + 0.1);
    expect(notGoodRes).toMatchObject({
      beginner: false,
      intermediate: true,
      advanced: true,
    });

    const allGoodRes = surfability.calcRainSurfA(surfability.precipationThres);
    expect(allGoodRes).toMatchObject({
      beginner: true,
      intermediate: true,
      advanced: true,
    });
  });

  test('it should be able to determine surfability from WIND DIRECTION', async () => {
    const notGoodRes = surfability.calcWindDirSurfA(Enum_Componentspottrafficlight_Value.Red);
    expect(notGoodRes).toMatchObject({
      beginner: false,
      intermediate: false,
      advanced: false,
    });

    const allGoodRes = surfability.calcWindDirSurfA(Enum_Componentspottrafficlight_Value.Green);
    expect(allGoodRes).toMatchObject({
      beginner: true,
      intermediate: true,
      advanced: true,
    });

    const beginnerNoGoodRes = surfability.calcWindDirSurfA(Enum_Componentspottrafficlight_Value.Yellow);
    expect(beginnerNoGoodRes).toMatchObject({
      beginner: false,
      intermediate: true,
      advanced: true,
    });
  });

  test('it should be able to determine surfability from spot data and a forecast', async () => {
    const res = surfability.spotSurfability(dummySpot1, dummyYrEntityBeginner.attributes.forecast);
    expect(res).toMatchObject({
      beginner:true,
      intermediate: true,
      advanced: true,
    });

    const res2 = surfability.spotSurfability(dummySpot2, dummyYrEntityIntermediate.attributes.forecast);
    expect(res2).toMatchObject({
      beginner:false,
      intermediate: true,
      advanced: true,
    });
    // TODO: test more examples
  });

  // TODO: add test with calcSurfability

});
