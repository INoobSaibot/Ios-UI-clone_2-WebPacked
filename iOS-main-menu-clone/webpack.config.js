const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
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