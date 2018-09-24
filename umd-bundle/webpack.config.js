const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './query-string.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出根目录
        publicPath: '/',
        filename: `query-string.js`, // 输出文件目录 及文件名格式
        library: {
            commonjs: 'query-string',
            amd: 'query-string',
            root: 'qs'
        },
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            }
        ]
    },
    mode: 'production'
}