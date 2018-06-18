const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/react-app/index.js',
    output: {
        path: path.resolve(__dirname) + '/public/assets',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                indclude: path.resolve(__dirname,'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}