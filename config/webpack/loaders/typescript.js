const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  test: /\.tsx?(\.erb)?$/,
  use: [
    {
      loader: 'babel-loader'
    },
    {
      loader: 'ts-loader',
      options: PnpWebpackPlugin.tsLoaderOptions()
    }
  ]
}
