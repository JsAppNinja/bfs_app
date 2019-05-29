'use strict'
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const buildWillWatch = (process.env.NODE_ENV === 'development');

module.exports = {
    entry: [
        'babel-polyfill',
        './App_UI/Components/Root.jsx'
    ],
    output: {
        path: path.resolve(__dirname + "/Scripts"),
        filename: 'bldr.js'
    },
    performance: {
        hints: false, 
        maxAssetSize: 250000, 
        maxEntrypointSize: 450000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader?sourceMap',
                    use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../css/bundle.css")
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    watch: buildWillWatch
};