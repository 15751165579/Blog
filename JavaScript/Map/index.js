/**
 * Map遍历时不会改变元素插入时的顺序。 （for of）
 * 
 * 
 * 1、Object的键值只能为String 或者 Symbol Map中可以是任意的值
 * 
 * 2、Map中的键值是有序的
 * 
 * 3、size获取Map中成员的个数
 * 
 * 4、Map可以直接进行迭代， Object很费劲
 * 
 * 5、Object.create(null) 避免Object原型的影响
 * 
 * 6、Map在处理频繁增删键值对的场景 性能好 
 * 
 * 7、键相等的算法 SameValueZero  (NaN与NaN是相等的 -0 === +0)
 * 
 */
const m = new Map()
m.set(NaN, 1)
m.set(NaN, 2)
m.set(+0, 1)
m.set(-0, 2)
console.log(m)