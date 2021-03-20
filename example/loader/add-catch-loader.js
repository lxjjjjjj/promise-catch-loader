const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const loaderUtils = require('loader-utils')
const generate = require('@babel/generator').default
const {baseParse} = require('@vue/compiler-core')

/**
 * @options catchCode
 */
module.exports = function WebpackPromiseCatchLoader(source) {
  const options = loaderUtils.getOptions(this) || {}
  const script = baseParse(source).children.find(n=>n.tag==='script').children[0].loc.source
  let ast = parser.parse(script, {
    sourceType: "module", // 支持 es6 module
    plugins: ["flow"] // 支持动态import dynamicImport typescript jsx
  })
  traverse(ast, {
    CallExpression(path){
      let { node } = path
      let firstExp = options.catchCode || `console.log('网络错误');`
      firstExp = parser.parse(firstExp).program.body
      if ((node.callee && 
        node.callee.property && 
        node.callee.property.type==='Identifier' 
        && node.callee.property.name === 'then')||
        (node.property && 
          node.property.type==='Identifier'&& 
          node.property.name === 'then')) {
        // 创建catch变量
        const catchName = t.identifier('catch')
        // 创建cacth的箭头函数
        const catchArrow =t.arrowFunctionExpression([],t.blockStatement([...firstExp]))
        // 给调用then函数的节点和catch节点创建.连接
        const catchFunc = t.memberExpression(node,catchName)
        //将箭头函数以参数的形式插入catch函数作为参数
        const newFunc = t.callExpression(catchFunc,[catchArrow])
        // 替换掉之前的节点
        path.replaceWith(newFunc)
        //并且跳过子节点以免重复调用
        path.skip()
      }
    }
  })
  console.log(generate(ast).code)
  return generate(ast).code
}
