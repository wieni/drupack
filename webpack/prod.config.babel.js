import path from 'path';

import entrypoints from './entrypoints.babel.js';

import rucksack from 'rucksack-css';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
    entry: entrypoints,
    output: {
        path: 'dist',
        publicPath: '/dist/',
        filename: '[name].js'
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
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
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced'
                ]
            }
        ]
    },
    postcss() {
        return [rucksack({
            autoprefixer: true,
        })];
    },
    resolve: {
        root: [
            path.resolve(__dirname, '../assets/')
        ],
    }
};
