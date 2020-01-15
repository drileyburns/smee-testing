const path = require("path");

module.exports = {
  entry: "./src/index-smee.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    publicPath: "/dist/",
    contentBase: "./src/",
    compress: true,
    port: 9000
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
