## 一些说明

babel需要安装

```js
// 核心代码
babel-core
// 2015转换
babel-preset-es2015
// banner版权声明助手函数
babel-plugin-external-helpers
// umd支持（即支持require，import引入的支持代码）
babel-plugin-transform-es2015-modules-umd
// 替换ES6的部分API，但是有一些不会替换，需要polyfill
babel-plugin-transform-runtime
// export default {} 支持不好，还得加个插件
babel-plugin-add-module-exports
```

额外说明

```js
// http://www.cnblogs.com/chris-oil/p/5717544.html
// 对ES7一些提案的支持，Babel通过插件的方式引入，让Babel可以编译ES7代码
// 包含stage-1, stage-2以及stage-3的所有功能以及额外的两个功能函数
babel-preset-stage-0
// 除了包含stage-2和stage-3，还包含了几个插件
// transform-class-properties,transform-export-extensions
babel-preset-stage-1
// 除了覆盖stage-3的所有功能外，还支持
// syntax-trailing-function-commas,transform-object-reset-spread
babel-preset-stage-2
// 支持async和await
babel-preset-stage-3

一般用2，不建议直接使用  async和await
```