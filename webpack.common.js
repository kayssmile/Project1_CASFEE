/* Webpack Configuration : Common                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
/* Webpack Configuration : Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */

const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");

/* Webpack Application                                                                                                                                                                      Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */

/*

let htmlPageNames = ['Projects', 'opening']; // Hier die einzelnen Seiten einfuegen 
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HTMLWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});
*/

module.exports = {
  entry: {
    main: "./src/JS/index.js",
  //  Projects: "./src/JS/Projects.js",
  //  opening: "./src/JS/opening.js",
  //  Contact: "./src/JS/Contact.js",
  },
  experiments: {"topLevelAwait": true},
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            preprocessor: (content, loaderContext) =>
              content.replace(
                /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi,
                (m, src) => {
                  const filePath = path.resolve(loaderContext.context, src)
                  loaderContext.dependency(filePath)
                  return fs.readFileSync(filePath, 'utf8')
                }
              ),
          }
        }
      },
      { 
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
      },

    ]
  },
  plugins: [
      new HTMLWebpackPlugin({
        template: "./src/index.html",
        chunks: ['main']}),
      new CleanWebpackPlugin(),
    ] //.concat(multipleHtmlPlugins)
};
