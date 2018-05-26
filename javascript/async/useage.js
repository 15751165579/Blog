/**
 * 来自大牛Jake Archibald的一道题目
 */

let sum = 0

async function start () {
  sum += await 2
  console.log(sum)
}

start()
sum += 1
console.log(sum)


let sum = 0

async function start () {
  sum = sum + await 2
  // 这里实际上就是sum = 0 + await 2
  console.log(sum) // 2
}

start()
sum = sum + 1
// 这里实际上就是 sum = 0 + 1
console.log(sum) // 1