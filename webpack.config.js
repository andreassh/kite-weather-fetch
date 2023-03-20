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
          "/dinbog-types", // TODO: replace this with kite-weather types
        ],
      },
    ],
  },
};
