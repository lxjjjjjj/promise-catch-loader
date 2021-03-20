// require("babel-polyfill");
const path = require("path");
module.exports = {
  entry: './index.vue',
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'add-catch-loader',
          options:{catchCode:'console.log(自定义错误)'},
        }
      }
    ]
  },
  resolveLoader:{
    modules: ['./node_modules', './loader']
  }
}