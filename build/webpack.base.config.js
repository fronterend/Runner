const webpack = require( 'webpack' ),
  HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
  ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

require( 'fs-extra' ).removeSync('./dist');

module.exports = {
  entry: './src/index',
  output: {
    path: './dist',
    filename: '[name]-[hash:10].js'
  },

  // 这个配置项是给 vue-loader 的
  babel: {
    presets: [ 'es2015', 'stage-3' ],
    plugins: [ 'transform-runtime' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!(\/|\\?\\)(vue-framework7)\1)/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'stage-3' ],
          plugins: [ 'transform-runtime' ]
        }
      },
      {
        test: /\.(woff2?|ttf|png|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name]-[hash:10].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader?sourceMap' )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader?sourceMap!sass-loader?sourceMap' )
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract( 'css-loader?sourceMap' ),
      sass: ExtractTextPlugin.extract( 'css-loader?sourceMap!sass-loader?sourceMap' )
    }
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: './src/index.html'
    } ),
    new ExtractTextPlugin( '[name]-[hash:10].css' )
  ]
};

