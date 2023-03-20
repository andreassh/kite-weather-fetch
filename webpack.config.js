import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./src/run.ts",
  target: "node",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    library: "job",
    libraryTarget: "commonjs2",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.ts?$/,
        exclude: [
          "/node_modules",
          "/**/*.test.ts/",
          "/kite-app-types", // TODO: replace this with real kite-weather types
        ],
      },
    ],
  },
};
