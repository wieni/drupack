var webpack = require('webpack'),
    rucksack = require('rucksack-css'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './assets/bundles/app.js',
    },
    output: {
        path: 'build',
        publicPath: 'build',
        filename: '[name].js'
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]),
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
    devServer: {
        hot: true,
        contentBase: 'http://drupal-base.drupal-php7.local.wieni.site/',
    },
};
