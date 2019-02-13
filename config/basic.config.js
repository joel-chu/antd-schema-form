const path = require('path');
const webpack = require('webpack');

/* 基础配置 */
exports.basicConfig = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'script/[name].js',
    chunkFilename: 'script/[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '../build')
  },
  devtool: 'module-eval-source-map',
};

/* rules */
exports.rules = [
  {
    test: /.*\.jsx?$/,
    use: ['babel-loader'],
    exclude: /(node_modules|mocha|chai)/
  },
  {
    test: /.*\.s(a|c)ss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]___[hash:base64:5]',
        }
      },
      'sass-loader'
    ],
    include: /(src|lib|example)/
  },
  {
    test: /.*\.css/,
    use: ['style-loader', 'css-loader'],
    include: /node_modules/
  }
];
/* plugins */
exports.plugins = [
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/
  })
];