var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './build');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// 1. 引入插件
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// mixin
var getPostCSSLoader = function() {
  return {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('postcss-import')({ addDependencyTo: webpack }),
        require('postcss-url')(),
        require('postcss-preset-env')({
          /* use stage 2 features (defaults) */
          stage: 2
        }),
        require('postcss-reporter')(),
        require('postcss-browser-reporter')({
          disabled: isProduction
        })
      ]
    }
  }
}

module.exports = {
  mode: isProduction ? 'production' : 'development', 
  context: sourcePath,
  entry: {
    index: './index.js'
  },
  output: {
    path: outPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      // .js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-transform-runtime'],
              ['@babel/plugin-transform-regenerator'],
              ['@babel/plugin-proposal-class-properties'],
              ['import', {
                'libraryName': 'antd',
                'libraryDirectory': 'es',
                'style': true
              }]
            ],
          }
        }
      },
      // less
      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          getPostCSSLoader(),
          {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true
            }
          }
        ],
      },
       // css
       {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            query: {
              sourceMap: !isProduction,
              importLoaders: 1,
            }
          },
          getPostCSSLoader(),
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=8192' }, // 8192 byte 以下的图片都自动转换成 base64 格式
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      chunks: "all", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      cacheGroups: {
        commons: {
          name: 'commons', // 名字以 common 开头
          minChunks: 2, // 重复使用 2次以上，就需要打包进 commons
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 如果是在 node_modules 里的包，就打成一个包
          minChunks: 1,
          name: "vendors" // 名字以 vendors 开头
        }
      }
    },
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'assets/index.html'),
    }),
    // 2. 实例化插件并挂载到 webpack 上
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'none' : 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
};
