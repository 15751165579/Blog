const fs = require('fs')
const path = require('path')

const demo = JSON.parse(fs.readFileSync(path.resolve(__dirname, './demo.json'), 'utf-8'))
const hasGroupSizeX = (deck) => {
  const max = deck.length
  if (max <= 1) {
    return false
  }

  const count = {}

  for (let i = 0; i < max; i++) {
    const item = deck[i]
    if (!count[item]) {
      count[item] = 0
    }
    count[item]++
  }

  const v = Object.values(count)
  const min = Math.min.apply(this, v)
  for (let i = 2; i <= min; i++) {
    let isComplete = true
    for (let j = 0; j < v.length; j++) {
      if (v[j] % i !== 0) {
        isComplete = false
      }
    }
    if (isComplete) {
      return true
    }
  }
  return false
}

console.log(hasGroupSizeX([1,2,3,4,4,3,2,1]), true)
console.log(hasGroupSizeX([1,1,1,2,2,2,3,3]), false)
console.log(hasGroupSizeX([1]), false)
console.log(hasGroupSizeX([1,1]), true)
console.log(hasGroupSizeX([1,1,2,2,2,2]), true)
console.log(hasGroupSizeX([1,1,1,1,2,2,2,2,2,2]), true)
console.log(hasGroupSizeX([0,0,0,0,0,1,1,2,3,4]), false)
console.log(hasGroupSizeX([0,0,0,0,0,0,1,1,2,2,3,3,4,4]), true)
console.log(hasGroupSizeX(demo), true)