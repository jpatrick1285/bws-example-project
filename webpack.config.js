const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (env, argv) => {

    return {
        entry: {
            main: './src/app.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname) + '/web/dist'
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        devtool: argv.mode === 'production' ? false : 'source-map',
        stats: 'none',
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
                    test: /\.scss|.css$/,
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
                    './templates'
                ],
                logSnippet: false,
                logLevel: 'warn',
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
            }),
            new CopyPlugin([{
                from: './src/img/static', to: './img/static'
            }]),
            new WebpackBar(),
            new FriendlyErrorsWebpackPlugin({
                clearConsole: false
            })
        ],
        resolve: {
            modules: [
                'node_modules'
            ],
            alias: {
                vue: argv.mode === 'development' ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js'
            }
        }
    };
};