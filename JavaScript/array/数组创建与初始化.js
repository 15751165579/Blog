// 两种方式创建数组
// 1、Array构造函数
// 2、数组字面量语法

// 稀疏数组

const a1 = new Array(1) // 生成长度为1的稀疏数组
console.log(a1)

const a2 = [1]
a2[3] = 2
console.log(a2)

// 创建一个长度为10，默认值为1的数组

// 一般写法
const a3 = []
for (let i = 0; i < 10; i++) {
  a3[i] = 1
}
console.log(a3)

const a33 = []
for (let i = 0; i < 10; a33[i++] = 1);
console.log(a33)

// es6 fill
const a4 = new Array(10).fill(1)
console.log(a4)

// 奇技淫巧
const a7 = Array.apply(null, { length: 10 }).fill(1)
console.log(a7)

// es6 扩展运算符 map
const a5 = [...new Array(10)].map(() => 1)
console.log(a5)

// map会忽略 empty

// v8源码 转化为对象 
// function ArrayMap(f, receiver) {
//   CHECK_OBJECT_COERCIBLE(this, "Array.prototype.map");

//   // Pull out the length so that modifications to the length in the
//   // loop will not affect the looping and side effects are visible.
//   var array = TO_OBJECT(this);（1）转化为对象
//   var length = TO_LENGTH(array.length);
//   if (!IS_CALLABLE(f)) throw %make_type_error(kCalledNonCallable, f);
//   var result = ArraySpeciesCreate(array, length);
//   for (var i = 0; i < length; i++) {
//     if (i in array) { // （2）过滤掉控制位
//       var element = array[i];
//       %CreateDataProperty(result, i, %_Call(f, receiver, element, i, array));
//     }
//   }
//   return result;
// }

// es6 Array.from方法
const a6 = Array.from({ length: 10 }, () => 1)
console.log(a6)


