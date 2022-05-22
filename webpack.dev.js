/* Webpack Configuration : Development                                                                                                                                                                        Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
/* Webpack Configuration : Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

/* Webpack Application                                                                                                                                                                      Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
module.exports = merge(common, {
  mode: "development",
  devServer: {
    watchFiles: ['src/**/*.html'],
  },
  output: {
      filename: '[name].[contenthash].js', //"main.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: 'assets/[name][ext]',
    //  sourceMapFilename: '[name].[hash:8].map',
      chunkFilename: '[id].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
         'style-loader', 'css-loader', 'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      },       
    ]
  }
});
