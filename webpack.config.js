var webpack = require('webpack');

module.exports = {
  devtool: "source-map",
  entry: [
      "./src/main.js",
  ],
  output : {
      filename: "/home/mmckeaveney/Development/FinalYearProject/jvm-real-time-metrics-app/jvm-real-time-metrics-java/src/main/webapp/bundle.js"
  },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!css!sass?outputStyle=expanded'
            },
        ]
    }
};