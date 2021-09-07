
const path = require("path");

const entryPlus = require('webpack-entry-plus');
const glob = require('glob');


module.exports = [
  {
    name: 'scripts',
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    entry: entryPlus([
      {
        entryFiles: glob.sync('./src/**/*.js', {
          ignore: './src/bootstrap/**/*.js'
        }),
        outputName: (item) => {
          item = item.replace('./src/', './');
          item = item.replace('.js', '')
          return item;
        }
      }
    ]),
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
                ]
              ]
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
    mode: process.env.NODE_ENV,
    optimization: {
      usedExports: true,
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    entry: entryPlus([
      {
        entryFiles: glob.sync('./src/bootstrap/**/*.js'),
        outputName: (item) => {
          item = item.replace('./src/', './');
          item = item.replace('.js', '')
          return item;
        }
      }
    ]),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'imports-loader',
            options: {
              imports: [
                'jquery'
              ]
            }
          }
        }
      ]
    }
  }
];
