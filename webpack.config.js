// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: {
    main: "./shelter/pages/main/js/index.js",
    pets: "./shelter/pages/pets/js/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["main"],
      title: "Shelter",
      favicon: "./shelter/assets/icons/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      filename: "pets.html",
      chunks: ["pets"],
      title: "Pets",
      favicon: "./shelter/assets/icons/favicon.ico",
    }),
  ],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
