// ES7新特性

// 一、Array.prototype.includes

// 实际上在ES5中已经有一个indexOf方法来确定一个元素在数组中的索引
// 我们经常用它来判断一个元素在数组中是否存在，而这样使用有一下几个问题

// 问题一：返回的是数字的索引，不存在时返回-1
const a = [1, 0, NaN, -0, +0]
console.log(`1 ===> ${a.indexOf(NaN)}`)
console.log(`-0 ===> ${a.indexOf(-0)}`)

// 问题二：无法判断NaN
// 值得注意的一点是，indexOf内部是使用 === （严格相等）来判断元素是否相等的，那么问题来了
// 我们多知道 === 也是有令人烦恼的一面的。

console.log(NaN === NaN)

// 也正是这种情况，但是我们数组中出现NaN时，你使用indexOf并不没有什么作用
console.log(a.indexOf(NaN))

// 对于NaN这种情况，在ES6中提供了一个方法弥补这种遗憾。
console.log(Object.is(NaN, NaN))

// 而针对以上问题，inlcudes多能完美的解决

console.log(a.includes(NaN))

// 对于includes的实现，可以参考https://tc39.github.io/ecma262/#sec-array.prototype.includes

// 如果你已经了上述链接中的算法，你应该对SameValueZero(searchElement, elementK)有点疑惑。

// 这时重点来了。

// 在ES6阶段，JS中有4中比较相等的算法

// 1、The Abstract Equality comparison algorithm (==) http://www.ecma-international.org/ecma-262/5.1/
/**
 * 相同类型时，主要在于Number中 NaN， -0， +0的特殊性
 * NaN与任何值不相等，包括自己；而 -0 与 +0是相等的
 * 
 * 不同类型时，判断就需要我们记住几个规则
 * 1、null 与 undefined 是相等。
 * 2、Boolean => Object => String 
 * [1] == 1 例子
 */

// 2、The Strict Equailty comparison algorithm (===) 
/**
 * 这种比较基本上， 基本上就没什么说的了。需要注意的地方还是数字类型NaN，-0，+0
 * NaN === NaN false
 * -0 === +0 true
 */
// 3、The SameValue Algorithm
/**
 * 这个算法的不同主要在于 Number 类型 
 * NaN 与 NaN 相等
 * -0 与 +0 不相等
 * 
 * 这种算法在ES5.1作为内部使用，也就是后来ES6中的Object.is()
 */
// 4、The SameValueZero Algorithm es6 内部Api https://www.ecma-international.org/ecma-262/6.0/index.html
/**
 * 主要区别还是在Number类型的判断 
 * NaN 与 NaN 相等
 * -0 与 +0 相等
 * 这个特性，其实我们可以从ES6中的一些api的使用看出来
 */
console.log(' === The SameValueZero === ')
const s = new Set()
s.add(-0)
console.log(s.has(+0))
s.add(NaN)
console.log(s.has(NaN))

// 对于前面三个 多是ES5.1的标准，实际上在ES6中，又添加了Symbol基本数据类型。所以这些算法实际上在ES6标准中也有相应的改变。
/**
 * 但是判断并没有太多饶人的地方，主要区别在于Symbol的创建方式
 */
console.log(' === Symbol === ')
const s1 = Symbol('foo')
const s2 = Symbol('foo')

console.log(s1 == s2)
console.log(s1 === s2)
console.log(Object.is(s1, s2))

const s3 = Symbol.for('zoo')
const s4 = Symbol.for('zoo')

console.log(s3 == s4)
console.log(s3 === s4)
console.log(Object.is(s3, s4))

// 二、操作符 **
/**
 * es7 中 提供 ** 来进行 幂运算
 */
console.log(8 ** 3)
console.log(Math.pow(8, 3))

console.log(2 ** 2 ** 0)
console.log((2 ** 2) ** 0)