// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const ejs = require('ejs');


const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js',
    // assetModuleFilename: './assets/images/[name][ext][query]',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      minify: 'false', // minify: 'true', минимизирует код html
      favicon: './src/assets/favicon.ico',
      scriptLoading: 'defer',
      // scriptLoading: 'async',
    }),
/*     new HtmlWebpackPlugin({
      filename: 'ej.html',
      templateContent: () => {
        return new Promise((resolve, reject)=>{
          ejs.renderFile('./src/ejstest/index.ejs', {count: 5}, {}, function(err, str){
            if (err) {
              reject();
            }
            resolve(str)
          });
        });
    },
      // chunks: ['index'],
      
      // template: './src/index.html',
      // inject: 'body',
      // minify: 'false', // minify: 'true', минимизирует код html
      // favicon: './src/assets/favicon.ico',
    }),  */
    // new HtmlWebpackPlugin({  // Also generate a test.html
    //   filename: 'test.html',
    //   template: './src/assets/test.html'
    // }),
    // ================================
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'source', to: 'dest' },
    //     { from: 'other', to: 'public' },
    //   ],
    // }),
    // ================================
    new CleanWebpackPlugin(),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: true,
          minimize: false, // minify: 'true', минимизирует код html
          // interpolate: true,
        },
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: [
                        'defaults',
                        'ie >= 8',
                        'last 4 version',
                      ],
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      //   // type: 'asset',
      //   type: 'asset/resource',
      //   generator: {
      //     filename: './assets/images/[name][ext][query]'
      //   }
      // },
      {
        test: /\.(?:gif|png|jpg|jpeg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.(?:ico)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/ico/[name][ext][query]',
        },
      },
      {
        test: /\.(?:svg)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/svg/[name][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext][query]',
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: './css/[name].css',
      })
    );

    // config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};
