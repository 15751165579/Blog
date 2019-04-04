// const 常量
// let 可变

// 两者与之前的 var 相比较不存在变量提升的效果
// 块级作用域


// 典型案例

function es5 () {
  for (var i = 0; i < 5; i++) {
    console.log('done')
  }
  console.log(i)
}

es5()

// 为什么 更好的可读性
function es5Best () {
  var i = 0
  for (; i < 5; i++) {
    console.log('done')
  }
  console.log(i)
}

es5Best()

function es6Best () {
  for (let i = 0; i < 5; i++) {
    console.log('done')
  }
  // console.log(i) i is not define
}

es6Best()