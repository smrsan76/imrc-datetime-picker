import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const libraryName = require("./package.json").name;
const nodeModulesPath = path.resolve(__dirname, "./node_modules");

export default env => {
  const minify = env.minify.toLowerCase() === "true";
  const config = {
    mode: "development",
    entry: {
      [libraryName]: ["./src/index.js"]
    },
    output: {
      library: libraryName,
      publicPath: "",
      umdNamedDefine: true,
      libraryTarget: "umd",
      path: path.resolve(__dirname, "./dist"),
      filename: `${libraryName}${minify ? ".min" : ""}.js`
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          exclude: [nodeModulesPath],
          use: ["babel-loader"],
          enforce: "pre"
        },
        {
          test: /\.*css$/,
          exclude: [nodeModulesPath],
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            { loader: "css-loader" },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  fiber: false
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        }
      ]
    },
    externals: {
      moment: "moment",
      "moment-jalaali": "moment-jalaali",
      react: "react",
      "react-dom": "react-dom"
    },
    optimization: {
      minimize: minify
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
      alias: {
        moment: path.resolve(__dirname, "./node_modules/moment"),
        "moment-jalaali": path.resolve(
          __dirname,
          "./node_modules/moment-jalaali"
        ),
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name]${minify ? ".min" : ""}.css`,
        chunkFilename: `[id]${minify ? ".min" : ""}.css`
      })
    ]
  };

  return config;
};
