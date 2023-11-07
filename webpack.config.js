const path = require('path');
module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/static/public/js/home.js'),
    slick: path.resolve(__dirname, 'src/static/public/js/slick.js'),
    spotifyApi: path.resolve(__dirname, 'src/static/public/js/spotifyApi.js'),
    promote_page: path.resolve(__dirname, 'src/static/public/js/promote.js'),
    getMusicData: path.resolve(__dirname, 'src/static/public/js/getMusicData.js')
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
