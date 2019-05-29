const assert = require('chai').assert
const expect = require('chai').expect

const Assertion =require('chai').Assertion

assert.strictEqual(3,3, 'these are not equal')

expect(3).to.equal(3)

expect({a: 1, b: 2}).to.have.all.keys('a', 'b')

expect({a: 1, b: 2}).to.contains.keys('a')

console.log(Assertion.prototype)

console.log(expect(3).to.equal(3).and.to.be.a('number'))
console.log(expect('1').to.be.a('string'))

// =========
// 浅谈源码
// =========

// chai.js 的组成
// 1、util 一些工具函数
// 2、AssertionError 输出标准化断言错误
// 3、注册插件 
// 4、assertion core expect assert should

// assertion 核心断言构造函数 最终主要采用 util/test 其中提供 addProperty addChainableMethod addMethod 扩展原型链 （创建一个新的断言对象，并且拷贝旧的断言对象的 __flags 属性中的对象）
// 一种是什么也不操作如 to 
// 修改__flags中的标记属性 如 not
// eq addMethod 利用apply指定函数正确的this, 再代理给 原型 源码中兼容了proxy 的方式
// a addChainableMethod 理解了
// ---> expect({b: 2}).to.have.a.property('b')
// ---> expect('foo').to.be.a('string')

// core 添加的一些方法 主要是三种 （property 本质上不会有太大的影响）
// 以上实现的就是 expect 
// 而 assert 和 should 实际上就是对于 expect 进一步封装