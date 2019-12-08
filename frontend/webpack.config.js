const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require( "path" );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var productionEnv = require('dotenv').config({path: __dirname + '/production.env'});
var developmentEnv = require('dotenv').config({path: __dirname + '/development.env'});

module.exports =  function(_env, argv) {
  // console.log('NODE_ENV: ', _env.NODE_ENV); // 'local'
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].[contenthash].js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProduction ? "production" : "development"
              }
            }
          ]
        },
        {
          test: /\.(png|PNG|gif|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              } 
          }]
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            "postcss-loader"
          ],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[contenthash].[ext]"
          }
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
        // inject: true
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].[contenthash].css",
          chunkFilename: "assets/css/[name].[contenthash].chunk.css"
        }),
        new webpack.DefinePlugin({
          "process.env": isProduction ? JSON.stringify(productionEnv.parsed) : JSON.stringify(developmentEnv.parsed)
        })
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        }),
        new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            }
          },
          common: {
            minChunks: 2,
            priority: -10
          }
        }
      },
      runtimeChunk: "single",
    },
    
  }
};
  