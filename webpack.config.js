const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
    form: path.resolve(__dirname, "src/form/form.js"),
    topbar: path.resolve(__dirname, "src/assets/javascripts/topbar.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource", // Utilisation du type 'asset/resource' pour file-loader
        generator: {
          filename: "images/[name][ext]", // Chemin de sortie pour les images
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images/*",
          to: "assets/images/[name][ext]",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      chunks: ["main", "topbar"],
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.resolve(__dirname, "src/form/form.html"),
      chunks: ["form", "topbar"],
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    watchFiles: ["./src/**"],
    port: 4000,
    hot: true,
  },
};
