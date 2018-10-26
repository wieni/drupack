import path from 'path';

import StylelintPlugin from 'stylelint-webpack-plugin';
import Autoprefixer from 'autoprefixer';

import common from './common.babel.js';

const config = {
    ...common,
    mode: 'development',
    module: {
        ...common.module,
        rules: [
            ...common.module.rules,
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                loader: "eslint-loader",
                options: {
                    fix: true,
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => ([
                                new Autoprefixer(),
                            ]),
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, '../resources')
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new StylelintPlugin({
            emitErrors: false,
            syntax: 'scss',
        }),
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, '../public'),
        proxy: {
            '*': {
                target: 'http://192.168.33.3',
                changeOrigin: true,
                onProxyReq: function(proxyReq, req, res) {
                    proxyReq.setHeader('host', 'motoren-toerisme.drupal-8-72.local.wieni.site');
                },
            },
        },
    },
    devtool: 'eval-source-map',
};

export default config;
