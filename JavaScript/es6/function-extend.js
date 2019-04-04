// 函数默认值

// 本质是 判断 undefined
function demo (a = 1) {
  console.log(a)
}

demo(undefined)

// es6 之前的处理方法 逻辑或的方式 但是会造成误杀的情况

function demo1 (a) {
  a = a || 1
  console.log(a)
}

demo1(0)

// rest 参数 ...变量名 重要的是直接得到了数组
// ES6之前需要处理 arguments 
