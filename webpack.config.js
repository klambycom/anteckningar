var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  target: 'atom',
  entry: './entry.js',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.png']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css?sourceMap',
          'sass?sourceMap',
          'autoprefixer?browsers=last 3 versions'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
