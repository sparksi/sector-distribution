
const path = require("path");

const entryPlus = require('webpack-entry-plus');
const glob = require('glob');


module.exports = [
  {
    name: 'scripts',
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    entry: entryPlus([{
        entryFiles: glob.sync('./src/**/*.js', {
          ignore: './src/bootstrap/**/*.js'
        }),
        outputName: (item) => {
            item = item.replace('./src/', './');
            item = item.replace('.js', '')
            return item;
        }
    }]),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                        [
                            "@babel/preset-env", { 
                                modules: false,
                                useBuiltIns: "entry",
                                corejs: 3,
                                targets: {
                                    browsers: "> 0.5%, ie >= 11"
                                }
                            }
                    ]]
                  }
                }
              },
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
  }, 
  {
    name: 'bootstrap-js',
    mode: 'development',
    optimization: {
      usedExports: true,
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    entry: entryPlus([{
        entryFiles: glob.sync('./src/bootstrap/**/*.js'),
        outputName: (item) => {
            item = item.replace('./src/', './');
            item = item.replace('.js', '')
            return item;
        }
    }]),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'imports-loader?jQuery=jquery'
        }
      ]
    }
  }
];

/*
  
  
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const sassLoaders = [
    'css-loader?minimize',
    'sass-loader?indentedSyntax=sass&includePaths[]=src'
];
const SASS = {
    name: 'sass',
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    entry: entryPlus([{
        entryFiles: glob.sync('./src/*.scss'),
        outputName: (item) => {
            item = item.replace('./src/', './');
            item = item.replace('.scss', '')
            return item;
        }
    }]),
    module: {
      rules: [
        {
				  test: /\.scss$/,
				  exclude: [/_[A-Za-z\-]+\.scss/, /node_modules/],
				  use: [
  				  {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
              },
            },
            {
              loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
          {
            loader: "resolve-url-loader",
            options: { sourceMap: true }
          },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }       
          ]
				}
      ]
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
        })
    ]
  },*/