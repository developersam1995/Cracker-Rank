const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client') + '/src/react-app/index.js',
  output: {
    path: path.resolve(__dirname, 'client') + '/public/assets',
    filename: 'bundle.js',
    publicPath: '/react-app/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'client') + '/src',
        loader: 'babel-loader',
        query: {
          presets: ['latest','react'],
          plugins: ['transform-object-rest-spread']
        },
        
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};