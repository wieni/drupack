import path from 'path';

import CssNano from 'cssnano';
import Autoprefixer from 'autoprefixer';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './common.babel.js';

const config = {
    ...common,
    module: {
        ...common.module,
        rules: [
            ...common.module.rules,
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => ([
                                new CssNano({
                                    zindex: false,
                                    autoprefixer: false,
                                    reduceIdents: false,
                                }),
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
        ...common.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    mode: 'production',
};

export default config;
