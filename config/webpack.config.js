var webpack = require('webpack');
var path    = require('path');

module.exports = {

  // All the files to pick-up in begining
  entry: {
    demo: './demo/demo.js',
    lib: ['./app/index.js']
  },

  output: {
    filename: 'demo.js',
    path: './dist'
  },

  resolve: {
    root: path.resolve(__dirname),
    // alias: { app: '/app', home: '/'},
    extensions: ['', '.js', '.tag.html'],
    modulesDirectories: ['node_modules', 'app', 'dist']
  },

  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot',
      _:    'lodash'
    }),

    new webpack.optimize.CommonsChunkPlugin("lib", "riot-form-builder.js")

  ],

  // Load modules
  module: {
    preLoaders: [
      // Riot Tag Compiler
      { test: /\.tag.html$/, exclude: /node_modules/, loader: 'tag' }
    ],
    loaders: [
      {
        // Bable ES6 Compiler
        test: /\.js$|\.tag$/, exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
