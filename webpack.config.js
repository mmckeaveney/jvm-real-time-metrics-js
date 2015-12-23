var webpack = require('webpack');

module.exports = {
  devtool: "source-map",
  entry: [
      "./src/main.js",
  ],
  output : {
      filename: "public/bundle.js"
  },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                //put excludes back
                loader: 'style!css!sass?outputStyle=expanded'
            },
        ]
    }
};