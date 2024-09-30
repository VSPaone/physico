const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/PhysicsEngine.js", // Entry point for the package
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "physico",
    libraryTarget: "umd",
    globalObject: "this"
  },
  externals: {
    react: "react",
    "react-dom": "react-dom"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
