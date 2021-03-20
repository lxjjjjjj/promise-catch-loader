# vue-promise-catch-loader
减轻代码负担，解析vue模版给promise的then添加catch模块
使用示例
```
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
```
// catchCode 是自定义在catch模块内的内容
