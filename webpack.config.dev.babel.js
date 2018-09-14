import path from "path";
import { argv } from "yargs";
import Fiber from "fibers";

const env = argv.env;
const isDevelopment = env === "development";
const isProduction = env === "production";
const config = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "source-map" : "eval",
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, "./docs")
  },
  entry: {
    app: [path.resolve(__dirname, "./docs/app.jsx")]
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./docs"),
    filename: `app.js`
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        enforce: "pre"
      },
      {
        test: /\.(c|sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: isDevelopment } },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              fiber: Fiber,
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: isProduction
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  }
};

if (isDevelopment) {
  config.entry.app.unshift("webpack/hot/only-dev-server");
}

export default config;
