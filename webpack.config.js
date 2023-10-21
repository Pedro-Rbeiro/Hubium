const path = require('path');
module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/static/public/js/home.js'),
    slick: path.resolve(__dirname, 'src/static/public/js/slick.js'),
  },
  mode: 'production', //Modo de execução (production ou development)
  output: {
    path: path.resolve(__dirname, 'src/static/public/js'),
    filename: '[name].bundle.min.js'
  },
  module: {
    rules: [{
      test: /.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env']
          ]
        }
      }
    }]
  },
}
