import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  devtool: false,
  entry: {
    main: {
      import: "./src/index.js",
    },
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensionAlias: {
      '.js': ['.ts', '.js']
    }
  },
  mode: "development",
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
};

export default config;
