// 原生获取命令行参数
// console.log(process.argv.splice(2))

/**
 * Unix: -
 * BSD: 
 * GNU: --
 */

// 当在实际的使用中 --save-dev -S

// const some = require('minimist')(process.argv.splice(2))
// console.log(some)
const argv = process.argv.splice(2)
const max = argv.length
const result = {
  _: []
}
for (let i = 0; i < max; i++) {
  const arg = argv[i]
  console.log(` *** ${arg}`)
  // --save-dev --save-dev some
  if (/^--.+/.test(arg)) {
    const key = arg.match(/^--(.+)/)[1]
    const next = argv[i + 1]
    if (next != null && !/^-.+/.test(next)) {
      result[key] = next
      i++
    } else {
      result[key] = true
    }
  } else if (/^-[^-]+/.test(arg)) {
    // -abc
    const items = arg.split('')
    console.log(items)
    items.forEach(item => {
      result[item] = true
    })
  } else {
    result._.push(arg)
  }
}

console.log(result)