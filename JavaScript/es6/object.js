// Object.is()
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(0, -0)) // false

// Object.assign() 可枚举

console.log(Object.assign({}, { name: 'xiaohong', age: 20 }))

// 常见的应用 1、为对象添加属性 2、为对象添加方法 3、合并多个对象 4、默认参数的设置

const s = { name: 'xiaohong' , age: 20 }


// getOwnPropertyDescriptors 获取对象上所有属性的描述符

// Object.assign 只能拷贝属性的值，
// 拷贝完整的对象 可以通过 defineproperties + getOwnPropertyDescriptors
console.log(Object.getOwnPropertyDescriptors(s))

// 代替 __proto__ 的 Object.setPrototypeOf() 和 Object.getPrototypeOf()

// Object.keys() Object.values() Object.entries()

// Object.fromEntries()