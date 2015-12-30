module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: { app: './index.js' },
  output: {
    filename: './public/bundle.js',
    publicPath: 'public'
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
  }
};
