'use strict'

process.env.BABEL_ENV = 'main'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

let mainConfig = {
  mode: process.env.NODE_ENV,
  target: 'electron-main',
  devtool: 'source-map',
  entry: {
    main: path.join(__dirname, '../../src/electron-main/main.ts')
  },
  output: {
    filename: '[name].js',// 生成的filename需要与package.json中的main一致
    path: path.resolve(__dirname, '../../dist/electron-main'),
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, '../../tsconfig.main.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [ ],
  resolve: {
    extensions: ['.ts', '.json', '.js']
  },
}

if (process.env.NODE_ENV !== 'production') { }

if (process.env.NODE_ENV === 'production') { }

module.exports = mainConfig
