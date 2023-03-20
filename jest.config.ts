import type {Config} from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/*.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  extensionsToTreatAsEsm: [".ts"],
  coverageDirectory: "./tests",
  coveragePathIgnorePatterns: ["node_modules", "src/**"],
  reporters: ["default"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default config;
