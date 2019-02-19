const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname) + '/web/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader', 
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: path.resolve(__dirname) + '/web/dist/fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new BrowserSyncPlugin({
            files: [
                './src',
                './templates'
            ],
            reloadDelay: 0
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new WebappWebpackPlugin({
            logo: './src/img/favicon_src.png',
            cache: true,
            prefix: 'img/favicon/',
            inject: false
        })
    ],
    resolve: {
        modules: [
            'node_modules'
        ],
        alias: {
            barba: path.resolve('node_modules', './barba.js/dist/barba.js')
        }
    }
};