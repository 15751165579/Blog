// 扩展运算符 符合 iterator 接口的对象 都可以采用

// 数组的复制  数组的合并 函数的 rest 参数

// Array.from() 处理类数组 并且第二个参数可进行初始化

console.log(Array.from({ length: 10 }, () => 1))

// Array.of 代替 new Array 或者 Array
console.log(Array.of(1, 2, 3))

// copyWithin 数组内部成员复制

const s = [0, 1, 2, 3, 4, 5]

console.log(s.copyWithin(0, 3, 4))

// find 找出第一个符合要求的成员
// findIndex 找出第一个符合要求的下标


// fill 填充数组 数组初始化可以使用


// entries keys values 再遍历中的使用


// includes 相比较 indexOf 
// 1、更加语义化
// 2、内部采用的 SameValueZero 0 === -0 NaN === NaN 而 indexOf 内部是采用的 === NaN !== NaN 会对 NaN 进行误判
// 3、返回 Boolean 不需要再与 -1 比较

// flat 用于扁平化 数组 
// flatMap 只能 展开一层


// 数组空位的问题
// - forEach()，filter()，every()，some()忽略数组空位的处理。
// - map()虽然同样忽略数组空位的处理，但是返回的数组中仍然含有这个空位。
// - join()和toString()将数组转化为字符串时，数组空位转化为空字符串。
// - ES6的方法则是将数组空位转化为undefined处理。