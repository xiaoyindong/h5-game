const path = require('path');
const webpack = require('webpack');
const { entry, html } = require('./fileList');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        // publicPath: "./src/images"
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/, use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [ // use 作用是使用多个loader
                    {
                        loader: 'file-loader?name=images/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.(mp3)$/,
                use: [ // use 作用是使用多个loader
                    {
                        loader: 'file-loader?name=music/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                    // plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
    resolve: {
        enforceModuleExtension: false,
        extensions: ['.js', '.jsx', '.css', '.less'],
        alias: {
            // 'vue': 'vue/dist/vue.common.js'
        }
    },
    // externals: {
    //     // react: 'react'
    // },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8000
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ].concat(html)
}

module.exports = config;