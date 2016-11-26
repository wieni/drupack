import path from 'path';

import entrypoints from './entrypoints.babel.js';

import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { DefinePlugin } from 'webpack';

module.exports = {
    entry: entrypoints,
    output: {
        path: 'public/assets/',
        publicPath: '/themes/custom/drupack/public/assets',
        filename: '[name].js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                APP_ENV: JSON.stringify('production'),
            },
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=0'
                ]
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
    }
};
