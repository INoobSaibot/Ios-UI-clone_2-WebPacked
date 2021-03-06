const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    mode: 'development',
    entry: {
        index:'./src/index.js',
    },
    // plugins: [
    //     // new HtmlWebpackPlugin({
    //     //     title: 'Output Management',
    //     }),
    // ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 250,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader',
                    'css-loader?sourceMap'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader',
                ],
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader',
                ],
            },
        ],
    },
};

//
//
// module.exports = {
//     entry: './src/_index.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader',
//                     'css-loader'
//                 ],
//             },
//             {
//                 test: /\.(png|svg|jpg|gif)$/,
//                 use: [
//                     'file-loader',
//                 ],
//             },
//         ],
//     },
// };
