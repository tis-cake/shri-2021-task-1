const fs = require('fs');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isDevTool = isDev ? 'source-map' : false;
const isTarget = isDev ? 'web' : 'browserslist';

const filename = (extension) => {
  const commonName = 'stories';
  return `${commonName}.${extension}`;

  // return isDev ? `[name].${extension}` : `[name].[hash].${extension}`;
};

const cssLoaders = (loaderExtra) => {
  const postcssLoaderOptions = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer'],
      },
    },
  };

  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    postcssLoaderOptions,
  ];

  if (loaderExtra) {
    loaders.push(loaderExtra)
  }

  return loaders;
};

const babelOptions = (presetExtra) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [],
  };

  if (presetExtra) {
    options.presets.push(presetExtra);
  }

  return options;
};

const pagesToHTMLWebpackPlugin = (extension) => {
  // !NB корректный путь до файлов
  const pagesDir = `${path.resolve(__dirname, 'src/pug')}`;
  const pages = fs.readdirSync(pagesDir).filter((fileName) => fileName.endsWith(`.${extension}`));

  const regexp = new RegExp(`.${extension}`);

  const pagesHTML = pages.map((page) => {
    const pageName = (extension !== 'html')
      ? `${page.replace(regexp, '.html')}`
      : `${page}`;

    return new HTMLWebpackPlugin ({
      template: `${pagesDir}/${page}`,
      filename: pageName,
      scriptLoading: 'blocking',
    });
  });

  return pagesHTML;
};

// const pagesHTML = pagesToHTMLWebpackPlugin('pug');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/main.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    watchContentBase: true,
    port: 8080,
    open: true,
    writeToDisk: isProd,
    // hot: isDev,
  },
  plugins: [
    // ...pagesHTML,

    new HTMLWebpackPlugin({
      template: './index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'build/assets/images'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'html-loader',
        }, {
          loader: 'pug-html-loader',
          options: {
            pretty: isDev,
          },
        }],
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            // useRelativePath: true,
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
  devtool: isDevTool,
  // target: isTarget,
};
