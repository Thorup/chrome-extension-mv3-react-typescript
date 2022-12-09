const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ZipPlugin = require('zip-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const alias = {
  // Paths defined at tsconfig.
  '@typings': path.resolve(__dirname, 'src', 'types'),
  '@utils': path.resolve(__dirname, 'src', 'utils'),
  '@assets': path.resolve(__dirname, 'src', 'assets'),
  '@background': path.resolve(__dirname, 'src', 'context', 'Background'),
  '@content': path.resolve(__dirname, 'src', 'context', 'Content'),
  '@newtab': path.resolve(__dirname, 'src', 'context', 'Newtab'),
  '@options': path.resolve(__dirname, 'src', 'context', 'Options'),
  '@panel': path.resolve(__dirname, 'src', 'context', 'Panel'),
  '@popup': path.resolve(__dirname, 'src', 'context', 'Popup'),
};

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

module.exports = (env) => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: {
      newtab: path.join(__dirname, 'src', 'context', 'Newtab', 'index.tsx'),
      options: path.join(__dirname, 'src', 'context', 'Options', 'index.tsx'),
      popup: path.join(__dirname, 'src', 'context', 'Popup', 'index.tsx'),
      background: path.join(
        __dirname,
        'src',
        'context',
        'Background',
        'index.ts',
      ),
      contentScript: path.join(
        __dirname,
        'src',
        'context',
        'Content',
        'index.ts',
      ),
      panel: path.join(__dirname, 'src', 'context', 'Panel', 'index.tsx'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: process.env.ASSET_PATH || '/',
    },
    optimization: {
      concatenateModules: env.production,
      minimize: env.production,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: true,
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          // look for .css or .scss files
          test: /\.(css|scss)$/,
          include: path.resolve(__dirname, 'src'),
          // in the `src` directory
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          include: path.resolve(__dirname, 'src/assets'),
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/images/[name].[ext]',
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'html-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'ts-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'source-map-loader',
            },
            {
              loader: 'babel-loader',
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      alias: alias,
      extensions: fileExtensions
        .map((extension) => '.' + extension)
        .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    },
    plugins: [
      new CleanWebpackPlugin({ verbose: env.development }),
      new webpack.ProgressPlugin(),
      new Dotenv({
        path: path.join(__dirname, 'env', `${env.goal}.env`),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'src', 'manifest.json'),
            to: path.join(__dirname, 'dist'),
            force: true,
            transform: function (content, path) {
              // Adds the project details to manifest file.
              // Makes is easier to maintain changes.
              return Buffer.from(
                JSON.stringify({
                  description: process.env.npm_package_description,
                  version: process.env.npm_package_version,
                  ...JSON.parse(content.toString()),
                }),
              );
            },
          },
          {
            from: path.join(
              __dirname,
              'src',
              'assets',
              'images',
              'icon-32.png',
            ),
            to: path.join(__dirname, 'dist', 'assets', 'images'),
            force: true,
          },
          {
            from: path.join(
              __dirname,
              'src',
              'assets',
              'images',
              'icon-64.png',
            ),
            to: path.join(__dirname, 'dist', 'assets', 'images'),
            force: true,
          },
          {
            from: path.join(
              __dirname,
              'src',
              'assets',
              'images',
              'icon-128.png',
            ),
            to: path.join(__dirname, 'dist', 'assets', 'images'),
            force: true,
          },
          {
            from: path.join(
              __dirname,
              'src',
              'assets',
              'i18n',
              'chrome',
              'en_GB.json',
            ),
            to: path.join(
              __dirname,
              'dist',
              '_locales',
              'en_GB',
              'messages.json',
            ),
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.join(
          __dirname,
          'src',
          'context',
          'Newtab',
          'index.html',
        ),
        filename: 'newtab.html',
        chunks: ['newtab'],
        cache: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(
          __dirname,
          'src',
          'context',
          'Options',
          'index.html',
        ),
        filename: 'options.html',
        chunks: ['options'],
        cache: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'context', 'Popup', 'index.html'),
        filename: 'popup.html',
        chunks: ['popup'],
        cache: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'context', 'Panel', 'index.html'),
        filename: 'panel.html',
        chunks: ['panel'],
        cache: false,
      }),
      ...(env.zip
        ? [
            new ZipPlugin({
              path: path.resolve(__dirname, 'release'),
              filename: `${env.zipName}_${process.env.npm_package_version}`,
            }),
          ]
        : []),
    ],
    ...(env.development ? { devtool: 'cheap-module-source-map' } : {}),
    devServer: {
      ...(env.WEBPACK_SERVE
        ? {
            https: false,
            hot: 'only',
            liveReload: false,
            host: 'localhost',
            port: env.port,
            client: {
              reconnect: false,
            },
            watchFiles: [path.join(__dirname, 'src/**/*')],
            static: {
              directory: path.join(__dirname, 'dist'),
            },
            devMiddleware: {
              publicPath: `http://localhost:${env.port}/`,
              writeToDisk: true,
            },
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            allowedHosts: 'all',
          }
        : {}),
    },
    infrastructureLogging: {
      level: 'info',
    },
    watchOptions: {
      aggregateTimeout: 400,
      poll: 700,
      ignored: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'dist'),
      ],
    },
  };
};
