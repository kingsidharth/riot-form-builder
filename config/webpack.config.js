var webpack = require('webpack');

module.exports = {

  // All the files to pick-up in begining
  entry: {
    demo: './demo/demo.js',
    lib: ['./app/o-form.tag.html', './app/o-input-collection.tag.html', './app/o-input-group.tag.html', './app/o-input-radio-types.tag.html']
  },

  output: {
    filename: 'demo.js',
    path: './dist'
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
