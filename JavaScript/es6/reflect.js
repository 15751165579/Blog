// 元编程 特性之一

// 1、那些明显是操作语言内部的方法 应该放在 Reflect 对象上
// 2、修改某些方法的返回结果，使其更加的合理。例如 defineProperty 无法定义属性时会抛出错误，而 Reflect.defineProperty 则是返回 false
// 3、讲某些命令式操作修改为方法，例如 in Reflect.has() delete Reflect.deleteProperty

// Reflect.apply(target, this, args)

// Reflect.get(target, name, receiver)

// Reflect.set(target, name, value, receiver)

// Reflect.defineProperty(target, name, desc)

// Reflect.deleteProperty(target, name) delete操作符

// Reflect.has(target, name) in 操作符

// Reflect.ownKeys()

// Reflect.getOwnPropertyDescriptor(tagret, name)

// Reflect.getPrototypeOf() Reflect.setPrototypeOf()

// Reflect.preventExtensions()

let obj = { name: 'demo' }
Reflect.preventExtensions(obj)

obj.age = 20
console.log(obj) // { name: 'demo' }