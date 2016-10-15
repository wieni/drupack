import path from 'path';

import entrypoints from './entrypoints.babel.js';

import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

export default {
    entry: entrypoints,
    output: {
        path: 'public/assets/',
        publicPath: '/themes/custom/drupack/public/assets/',
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
                test: /\.jsx?$/,
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
                test: /\.jsx?$/,
                loaders: ['eslint']
            }
        ]
    },
    postcss() {
        return [
            rucksack({ fallbacks: true }),
            autoprefixer({
                browsers: ['> 0.5% in BE', 'last 10 versions', 'Firefox ESR', 'not ie <= 10']
            }),
        ];
    },
    resolve: {
        root: [
            path.resolve(__dirname, '../assets/'),
            path.resolve(__dirname, '../assets/src/'),
        ],
    },
    devServer: {
        port: 8080,
        progress: true,
        proxy: {
            '*': {
                target: 'http://192.168.33.3',
                changeOrigin: true,
                onProxyReq: function(proxyReq, req, res) {
                    proxyReq.setHeader('host', 'SITENAME.drupal-8.local.wieni.site');
                }
            }
        }
    },
};
