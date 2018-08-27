// 块级作用域在ES6之前的替代方案
/* eslint-disable */
{
  try {
    throw undefined
  } catch (a) {
    a = 1
    console.log('内部： ' + a)
  }
}

// console.log(a) // ReferenceError

// 对于ES6这些新增的声明最好是声明在当前块级的顶部，就像ES5之前的for循环中的var声明在顶部一样。

// try/catch的性能让人诟病


// 词法作用域关注函数在哪里声明，而动态作用域则关注函数在哪里调用。

// this的绑定问题 相比较call apply bind 还是用上箭头函数省心呢？