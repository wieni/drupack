import path from 'path';

import entrypoints from './entrypoints.babel.js';

import rucksack from 'rucksack-css';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

export default {
    entry: entrypoints,
    output: {
        path: 'dist/',
        publicPath: '/themes/custom/drupack/dist/',
        filename: '[name].js'
    },
    plugins: [
        new StyleLintPlugin({
            syntax: 'scss',
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'react-hot',
                    'babel-loader',
                ],
                include: path.resolve(__dirname, '../assets')
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced'
                ]
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint']
            }
        ]
    },
    postcss() {
        return [rucksack({
            autoprefixer: true
        })];
    },
    resolve: {
        root: [
            path.resolve(__dirname, '../assets/')
        ],
    },
    devServer: {
        port: 8080,
        progress: true,
        proxy: {
            '*': {
                target: 'http://192.168.33.3',
                rewrite: function(req) {
                    req.headers.host = 'SITENAME.drupal-8.local.wieni.site';
                }
            }
        }
    },
};
